export const fetchData = async (tableName, url, cols, loadCondition, query) => {
  let val = "";
  const getTableInfo = JSON.parse(sessionStorage.getItem("tableInfo"));

  if (loadCondition.length > 0) {
    // console.log("At fetch loadCondition", loadCondition);
    // console.log("At fetch getTableInfo: ", getTableInfo);
    let dataTypes = getTableInfo[tableName]["dataTypes"];
    // console.log("Data types: ", dataTypes);
    for (let i = 0; i < loadCondition.length; i++) {
      console.log("Load condition: ", Object.keys(loadCondition[i])[0]);
      let key = Object.keys(loadCondition[i])[0];
      console.log("dataTypes[key]: ", dataTypes[key]);
      if (dataTypes[key].localeCompare("int(11)") == 0)
        val += `${key} = ${loadCondition[i][key]}`;
      else val += `${key} = "${loadCondition[i][key]}"`;
      if (loadCondition.length - 1 != i) val += " and ";
    }
  }
  console.log("Query is", query);

  const changes = {
    tableName: tableName,
    operation: "load",
    conditionCheck: val,
  };
  const response = await fetch(`http://localhost:3000/users/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ changes, getTableInfo, query }),
  });
  const data = await response.json();
  return data;
};
