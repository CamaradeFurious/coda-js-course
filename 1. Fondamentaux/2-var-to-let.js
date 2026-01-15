function add(a, b) {
  const result = a + b;
  return result;
}

function substract(a, b) {
  let result;

  if (a < b) {
    result = 0;
  } else {
    result = a - b;
  }

  return result;
}

function main(number1, number2) {
  console.log("L'addition des deux nombres vaut:", add(number1, number2));
  console.log(
    "La soustraction des deux nombres vaut:",
    substract(number1, number2),
  );
}

main(
  parseInt(process.argv[2] || "0", 10),
  parseInt(process.argv[3] || "0", 10),
);

