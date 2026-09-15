// Task 1
// Add an event listner to the button (the user drags his mouse over the button)
document.getElementById("justin-btn").addEventListener("mouseover", () => {
    let resultBox = document.getElementById("result");
    resultBox.innerText = "Welcome to My World";
    resultBox.style.backgroundColor = "pink";
    resultBox.style.color = "blue";
});

// Task 2
// Add an event listner to the button (the user drags his mouse out of the button)
document.getElementById("justin-btn").addEventListener("mouseout", () => {
    let resultBox = document.getElementById("result");
    resultBox.innerText = "Don't Leave Me Please";
    resultBox.style.backgroundColor = "black";
    resultBox.style.color = "red";
});