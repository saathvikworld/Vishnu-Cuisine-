const form = document.getElementById("orderForm");
const totalEl = document.getElementById("totalAmount");
const checkboxes = form.querySelectorAll('input[name="items"]');

function updateTotal() {
  let total = 0;
  checkboxes.forEach(cb => {
    if (cb.checked) {
      total += Number(cb.dataset.price || 0);
    }
  });
  totalEl.textContent = total;
}

checkboxes.forEach(cb => cb.addEventListener("change", updateTotal));

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const name = formData.get("name");
  const room = formData.get("room");
  const phone = formData.get("phone");
  const paymentMode = formData.get("paymentMode");

  const selectedItems = [];
  checkboxes.forEach(cb => {
    if (cb.checked) {
      selectedItems.push({
        name: cb.value,
        price: Number(cb.dataset.price),
      });
    }
  });

  if (selectedItems.length === 0) {
    alert("Please select at least one item.");
    return;
  }

  const total = selectedItems.reduce((sum, it) => sum + it.price, 0);

  // For a class project, you can just show an alert or log this.
  // In a real app, you'd send this to a backend or payment gateway.
  const orderSummary =
    `Order placed!

Name: ${name}
Room: ${room}
Phone: ${phone}
` +
    `Items:
${selectedItems.map(i => `- ${i.name} (₹${i.price})`).join("
")}
` +
    `Total: ₹${total}
Payment: ${paymentMode}`;

  alert(orderSummary);

  // Optional: clear form
  // form.reset();
  // updateTotal();
});
