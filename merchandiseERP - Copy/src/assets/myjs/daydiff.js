function dayDiff(tdName, myTable, scell, ecell) {
    var table = document.getElementById(myTable);
    var days = 0;

    for (var i = 1; i < table.rows.length; i++) {
        var startDateCell = table.rows[i].cells[scell];
        var endDateCell = table.rows[i].cells[ecell];

        // Check if the cells are defined
        if (startDateCell && endDateCell) {
            var startDate = startDateCell.textContent.trim();
            var endDate = endDateCell.textContent.trim();

            if (startDate && endDate) {
                // const mStartDate = new Date(endDate);
                // const mEndDate = new Date(startDate);
                const mStartDate = new Date(startDate);
                const mEndDate = new Date(endDate);

                // Check if the dates are valid
                if (!isNaN(mStartDate.getTime()) && !isNaN(mEndDate.getTime())) {
                    // Calculate the time difference in milliseconds
                    if(mStartDate.getTime() == mEndDate.getTime()){
                        days +=2;

                    }

                    const timeDifference = mEndDate.getTime() - mStartDate.getTime();



                    // Convert the time difference to days
                    days += Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
                }
            }
        }
    }

    document.getElementById(tdName).innerHTML = days;
}