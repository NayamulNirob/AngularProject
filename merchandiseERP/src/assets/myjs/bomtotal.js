// TOTAL PRICE CALCULATION FOR 3 DIFFERENT TABLE

    function showTotal(tdName,myTable,qcell,ucell){
        // var total=document.getElementById('tdName').innerHTML;
        var table=document.getElementById(myTable);
        var totalCost=0;

        for(var i=1; i < table.rows.length; i++){

            var quantityCell = table.rows[i].cells[qcell];
            var unitPriceCell = table.rows[i].cells[ucell];
            

            // Check if cells exist
            if (quantityCell && unitPriceCell) {
                var quantity = parseFloat(quantityCell.textContent.trim()) || 0;
                var unitPrice = parseFloat(unitPriceCell.textContent.trim()) || 0;

                totalCost += quantity * unitPrice;
                
                
            }
        }
        // console.log('Total Cost: ' + totalCost);

        document.getElementById(tdName).innerHTML= totalCost.toFixed(1);



    }

    function allTotal(){
        showTotal('totalprice','smallTable',4,5);
        showTotal('totalPriceMid','mediumTable',4,5);
        showTotal('totalPriceLarge','largeTable',4,5);
        showTotal('laborCostTotal','laborCostTable',1,2);
        console.log("in bototal js")
    }
    // document.getElementById('btntotalcost').addEventListener('click', showTotal('totalprice','smallTable',4,5));
    // Call the function when the page loads
    // window.onload = function () {
    //     showTotal('totalprice','smallTable',4,5);
    //     showTotal('totalPriceMid','mediumTable',4,5);
    //     showTotal('totalPriceLarge','largeTable',4,5);
    //     showTotal('laborCostTotal','laborCostTable',1,2);
    //     console.log("in bototal js")
    // };


