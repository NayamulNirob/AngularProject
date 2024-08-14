
    //function clear all
    function clearall(){

        var price = document.getElementById('txtPrice').value;
        var qty = document.getElementById('txtQuantity').value;
        var discount = document.getElementById('txtDiscount').value;


        if (price != null || qty != null || discount != null) {
            document.getElementById('txtPrice').value = '0.00';
            document.getElementById('txtQuantity').value = '0.00';
            document.getElementById('txtDiscount').value = '0.00';

        }


    }
    //function clear all end
    //function total amount
    function totalAmount() {
        var price = parseFloat(document.getElementById('txtPrice').value) || 0;
        var qty = parseFloat(document.getElementById('txtQuantity').value) || 0;
        var discount = parseFloat(document.getElementById('txtDiscount').value) || 0;
        // var mprice = parseFloat(document.getElementById('txtPriceM').value) || 0;
        // var lqty = parseFloat(document.getElementById('txtQuantityL').value) || 0;
        // var lprice = parseFloat(document.getElementById('txtPriceL').value) || 0;

        var subtotal = price * qty -discount;
        var vat = parseFloat(document.getElementById('txtVat').value) || 0;
        // var discount = parseFloat(document.getElementById('discount').value) || 0;
        var total = subtotal + vat;
        var paid = parseFloat(document.getElementById('txtPaidAmount').value) || 0;
        var due = total - paid;

        document.getElementById('txtSubtotal').value = subtotal.toFixed(2);
        document.getElementById('txtTotalAmount').value = total.toFixed(2);
        document.getElementById('txtDueAmount').value = due.toFixed(2);
    }
    //function total amount end
    //function paid on keyup

    function updatePaid() {
        var due = parseFloat(document.getElementById('txtDueAmount').value) || 0;
        var paid = parseFloat(document.getElementById('txtPaidAmount').value) || 0;
        var total = parseFloat(document.getElementById('txtTotalAmount').value) || 0;

        if (!isNaN(due) && !isNaN(paid) ) {
            // Only update due if both due and paid are valid numbers
            due = total - paid;
        } else {
            // Handle invalid input (non-numeric)
            alert('Please enter valid numeric values for Due and Paid.');
        }

        document.getElementById('txtDueAmount').value = due.toFixed(2);
    }

    //function paid on keyup end
    document.getElementById('btnAddToCart').addEventListener('click', totalAmount);
    document.getElementById('txtPaidAmount').addEventListener('keyup', updatePaid);
