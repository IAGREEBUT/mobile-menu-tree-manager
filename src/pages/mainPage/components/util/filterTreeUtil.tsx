import { menuInfo } from "../../../../types/dataTypes";

import {matcher, isMatch} from 'matcher';

// matcher 
// (검색어, 노드)

export const defaultMatcher = (filterText:string, node:menuInfo):boolean => {
  //노드의 name내에 검색어가 존재하는가? (일치x 존재o)

    var sname = node.name?.replaceAll(" ",""); // 공백제거 

    return sname?.trim().toLowerCase().indexOf(filterText.toLowerCase()) !== -1; //찾는 문자열이 존재하는지 여부 
  };
  
  //key값이 일치하는지 판단 
  export const defaultMatcherId = (key:string, node:menuInfo) => {
    return node.key === key;
  };
  

  export const findNode:any = (node:menuInfo, filter:string, matcher:(filterText:string, node:menuInfo) => boolean) => {
    return (
      matcher(filter, node) || // node가 일치함 
      (node.childInfo && // node에 childInfo가 존재하며, 그들 중 하나가 일치하는 경우
        node.childInfo.length &&
        !!node.childInfo.find((child:menuInfo) => findNode(child, filter, matcher)))
    );
  };
  

  export const filterTree:any = (
    node:menuInfo, //모든 데이터 
    filter:string, // 검색어 
    matcher = defaultMatcher,
  ) => {
    // 본인이 일치하거나 -> 자식은 자동으로 전부 포함 
    if (matcher(filter, node) || !node.childInfo) {
      return node;
    }
    // 일치하는 child가 있음 
    const filtered = node.childInfo
      .filter((child) => findNode(child, filter, matcher)) //child중에서 filter를 통과한 요소로만 구성된 배열을 반환 
      .map((child) => filterTree(child, filter, matcher)); //필터를 통과한 요소중에서 다시 child를 검사하기위해 재귀로 실행 
    return Object.assign({}, node, { childInfo : filtered }); //해당 노드의 childInfo를 일치하는 child 배열로만 대체함 
  };
  

  //key값을 이용해서 찾는 것 
  // export const filterTreeId:any = (
  //   node:menuInfo,
  //   key:string,
  //   matcher = defaultMatcherId,
  // ) => {
  //   //해당 key와 일치하함 
  //   if (node.key === key) {
  //     return node;
  //   }
  //   // If not then only keep the ones that match or have matching descendants
  //   const filtered = node.childInfo!
  //     .filter((child) => findNode(child, key, matcher))
  //     .map((child) => filterTreeId(child, key, matcher));
  //   return Object.assign({}, node, { childInfo: filtered });
  // };
  

  export const expandFilteredNodes:any = (
    node:menuInfo,
    filter:string,
    matcher = defaultMatcher,
  ) => {
    let children = node.childInfo;

    //자식이 없으면 toggle : false 
    if (!children || children.length === 0) {
      return Object.assign({}, node, { toggled: false });
    }

    //자식이 존재하는 경우 
    if(node.childInfo != null){

      //해당 노드의 자식중에 매치되는 것들을 담음 
          const childrenWithMatches = node.childInfo.filter((child) =>
          findNode(child, filter, matcher),
        );

        // 매치되는 것이 1개라도 존재하는 경우에 shouldExpand : true 
        const shouldExpand = childrenWithMatches.length > 0;


        // 재귀적으로 해당 노드의 자식들도 탐색함 
        if (shouldExpand) { //매치되는것이 존재하는 한 
          children = childrenWithMatches.map((child) => {
            return expandFilteredNodes(child, filter, matcher);
          });
        }

        // expand되어야 하는 노드들 반환 
        return Object.assign({}, node, {
          childInfo: children,
          toggled: shouldExpand,
        });
    }


  };
  
  //key값을 이용해 expand하기위해 
  let store:string[] = [];
  export const getIDsExpandFilter = (node:menuInfo) => {

    let children = node.childInfo;

    //노드에 자식없으면 그냥 빈배열 
    if (!children || children.length === 0) {
      return store;
    }

    //루트인 경우에 일단 루트를 담음 
    if (node.key === '0') {
      store = ['0'];
    }

    //자식이 있는 경우에 모든 자식의 key값을 다 expand list에 담음 
    if (children) {
      children.map((child) => store.push(child.key));
    }

    //재귀적으로 실행 
    node.childInfo?.map((child) => getIDsExpandFilter(child));

    //최종결과 값 반환 
    return store;
  };
  
  /**
   * Find tree item with recursive approach
   * @param node
   * @param key
   */
  export const searchTree:any = (node:menuInfo, key:string) => {
    if (node.key === key) {
      return node;
    } else if (node.childInfo != null) {
      let index;
      let result;
      for (index = 0; result == null && index < node.childInfo.length; index++) {
        result = searchTree(node.childInfo[index], key);
      }
      return result;
    }
    return null;
  };