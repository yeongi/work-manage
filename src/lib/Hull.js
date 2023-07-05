// hullList
export const depulicateRemoveHullArray = (hullList) => {
  const hash = {};
  const result = [];

  hullList.forEach(({ HULL_TYPE, SHIPYARD, HULL_SQ }) => {
    const key = [HULL_TYPE, SHIPYARD].join(",");
    if (!(key in hash)) {
      hash[key] = HULL_SQ;
    }
  });

  for (const hullStr in hash) {
    const [HULL_TYPE, SHIPYARD] = hullStr.split(",");
    result.push({
      HULL_TYPE,
      SHIPYARD,
      HULL_SQ: hash[hullStr],
    });
  }

  result.unshift({
    HULL_TYPE: "기타 업무",
    SHIPYARD: "기타 업무",
    HULL_SQ: 1,
  });

  return result;
};

export const filterListWithHullTypeShipYard = (hullList, cur) => {
  if (cur.HULL_TYPE === "기타 업무") {
    return [
      {
        key: 1,
        label: "기타 업무",
        value: 1,
      },
    ];
  }

  return hullList
    .filter(({ HULL_TYPE, SHIPYARD }) => {
      return HULL_TYPE === cur.HULL_TYPE && SHIPYARD === cur.SHIPYARD;
    })
    .map(({ HULL_NO, HULL_SQ, HULL_TYPE, SHIPYARD }) => {
      return {
        key: HULL_SQ,
        label: `선체 번호 : ${HULL_NO} /선체 종류 : ${HULL_TYPE} / 조선소 : ${SHIPYARD}`,
        value: HULL_SQ,
      };
    });
};
