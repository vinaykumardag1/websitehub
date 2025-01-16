const apiUrl = "http://localhost:4000/api/";
const mytable=document.getElementById("#myTable")        
// Initialize DataTable
const table = $(mytable).DataTable();

// Fetch data from the API and populate the table
async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        table.clear(); // Clear existing table data
        data.map((item,index) => {
            table.row.add([
                index+1,
                item.name,
                item.url,
                item.desc,
                `
                <button class="btn  btn-warning edit-btn" data-id="${item._id}" data-column1="${item.column1}" data-column2="${item.column2}">Edit</button>
                <button class="btn  btn-danger delete-btn" data-id="${item._id}">Delete</button>
                `
            ]).draw();
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Update a row
// async function updateRow(id, column1, column2) {
//     try {
//         const response = await fetch(`${apiUrl}${id}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ column1, column2 })
//         });
//         if (response.ok) {
//             fetchData();
//             alert("Row updated successfully!");
//         } else {
//             alert("Failed to update row.");
//         }
//     } catch (error) {
//         console.error("Error updating row:", error);
//     }
// }

// // Delete a row
// async function deleteRow(id) {
//     try {
//         const response = await fetch(`${apiUrl}${id}`, {
//             method: "DELETE"
//         });
//         if (response.ok) {
//             fetchData();
//             alert("Row deleted successfully!");
//         } else {
//             alert("Failed to delete row.");
//         }
//     } catch (error) {
//         console.error("Error deleting row:", error);
//     }
// }

// // Handle edit button click
// $("#myTable").on("click", ".edit-btn", function () {
//     const id = $(this).data("id");
//     const currentColumn1 = $(this).data("column1");
//     const currentColumn2 = $(this).data("column2");

//     const newColumn1 = prompt("Edit Column 1:", currentColumn1);
//     const newColumn2 = prompt("Edit Column 2:", currentColumn2);

//     if (newColumn1 !== null && newColumn2 !== null) {
//         updateRow(id, newColumn1, newColumn2);
//     }
// });

// // Handle delete button click
// $("#myTable").on("click", ".delete-btn", function () {
//     const id = $(this).data("id");
//     if (confirm("Are you sure you want to delete this row?")) {
//         deleteRow(id);
//     }
// });

// Fetch data on page load
fetchData();