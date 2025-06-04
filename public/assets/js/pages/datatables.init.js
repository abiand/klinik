/*
Template Name: Velzon - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: datatables init js
*/

document.addEventListener('DOMContentLoaded', function () {
    let table = new DataTable('#example',);
});


document.addEventListener('DOMContentLoaded', function () {
  let table = new DataTable('#scroll-vertical', {
      "scrollY":        "210px",
      "scrollCollapse": true,
      "paging":         false
    });
    
});

document.addEventListener('DOMContentLoaded', function () {
  let table = new DataTable('#scroll-horizontal', {
      "scrollX": true
    });
});

document.addEventListener('DOMContentLoaded', function () {
  let table = new DataTable('#alternative-pagination', {
      "pagingType": "full_numbers"
    });
});
/*
$(document).ready(function() {
    var t = $('#add-rows').DataTable();
    var counter = 1;
 
    $('#addRow').on( 'click', function () {
        t.row.add( [
            counter +'.1',
            counter +'.2',
            counter +'.3',
            counter +'.4',
            counter +'.5',
            counter +'.6',
            counter +'.7',
            counter +'.8',
            counter +'.9',
            counter +'.10',
            counter +'.11',
            counter +'.12'
        ] ).draw( false );
 
        counter++;
    } );
 
    // Automatically add a first row of data
    $('#addRow').click();
}); */

$(document).ready(function () {
        var counter = 1;

        var t = $('#add-rows').DataTable();

        // Add new row on button click
        $('#addRow').on('click', function () {

      
            t.row.add([
                `Row ${counter} Col 1`,
                `Row ${counter} Col 2`,
                `Row ${counter} Col 3`,
                `Row ${counter} Col 4`,
                `Row ${counter} Col 5`
            ]).draw(false);

            counter++;
        });

        // Make cell editable on double click
        $('#add-rows tbody').on('dblclick', 'td', function () {
            var cell = t.cell(this);
            var originalValue = cell.data();

            // Prevent adding input again if already editing
            if ($(this).find('input').length > 0) return;

            // Replace cell content with an input
            $(this).html(`<input type="text" class="form-control form-control-sm" value="${originalValue}" />`);
            var input = $(this).find('input');

            // Focus and select text
            input.focus().select();

            // Handle blur (save) and Enter key
            input.on('blur', function () {
                var newValue = $(this).val();
                cell.data(newValue).draw();
            });

            input.on('keydown', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    $(this).blur(); // Trigger blur to save
                }
            });
        });

        // Optional: Add initial row
        $('#addRow').click();
    });


$(document).ready(function() {
    $('#example').DataTable();
});

//fixed header
document.addEventListener('DOMContentLoaded', function () {
  let table = new DataTable('#fixed-header', {
      "fixedHeader": true
    });
    
}); 

//modal data datables
document.addEventListener('DOMContentLoaded', function () {
  let table = new DataTable('#model-datatables', {
      responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.modal( {
                    header: function ( row ) {
                        var data = row.data();
                        return 'Details for '+data[0]+' '+data[1];
                    }
                } ),
                renderer: $.fn.dataTable.Responsive.renderer.tableAll( {
                    tableClass: 'table'
                } )
            }
        }
    });
    
}); 

//buttons exmples
document.addEventListener('DOMContentLoaded', function () {
  let table = new DataTable('#buttons-datatables', {
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print', 'pdf'
        ]
    });
}); 

//buttons exmples
document.addEventListener('DOMContentLoaded', function () {
  let table = new DataTable('#ajax-datatables', {
        "ajax": 'assets/json/datatable.json'
    });
}); 