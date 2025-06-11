/*
Template Name: Velzon - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: list Js File
*/
/*
document.addEventListener('DOMContentLoaded', function () {
  let table = new DataTable('#horariumtable', {
      "scrollY":        "110px",
      "scrollCollapse": true,
      "paging":         false,
      "searching": false
    });
    
});*/
// FilePond
FilePond.registerPlugin(
    // encodes the file as base64 data
    FilePondPluginFileEncode,
    // validates the size of the file
    FilePondPluginFileValidateSize,
    // corrects mobile image orientation
    FilePondPluginImageExifOrientation,
    // previews dropped images
    FilePondPluginImagePreview
);

var inputMultipleElements = document.querySelectorAll('input.filepond-input-multiple');
if(inputMultipleElements){

// loop over input elements
Array.from(inputMultipleElements).forEach(function (inputElement) {
    // create a FilePond instance at the input element location
    FilePond.create(inputElement);
})
//asds
FilePond.create(
    document.querySelector('.filepond-input-circle'), {
        labelIdle: 'Drag & Drop your picture or <span class="filepond--label-action">Browse</span>',
        imagePreviewHeight: 170,
        imageCropAspectRatio: '1:1',
        imageResizeTargetWidth: 200,
        imageResizeTargetHeight: 200,
        stylePanelLayout: 'compact circle',
        styleLoadIndicatorPosition: 'center bottom',
        styleProgressIndicatorPosition: 'right bottom',
        styleButtonRemoveItemPosition: 'left bottom',
        styleButtonProcessItemPosition: 'right bottom',
    }
);
}
$(document).ready(function () {
        var counter = 1;

        var t = $('#horariumtable').DataTable({
        columnDefs: [{
            targets: -1, // Last column (for delete)
            data: null,
            defaultContent: '<button class="btn btn-sm btn-danger delete-row">Delete</button>',
            orderable: false
        }],
        scrollY: "110px",
        scrollCollapse: true,
        paging: false,
        searching: false
    });

        // Add new row on button click
        $('#addRowHor').on('click', function () {
       
            t.row.add([
                `Tindakan ${counter}`,
                `Treatment ${counter}`,
                `Obat ${counter}`,
            null
            ]).draw(false);

            counter++;
        });

        // Make cell editable on double click
        $('#horariumtable tbody').on('dblclick', 'td', function () {
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

        $('#horariumtable tbody').on('click', '.delete-row', function (e) {
              e.preventDefault(); // ✅ prevent default button behavior
    e.stopPropagation(); 
            t.row($(this).parents('tr')).remove().draw();
        });
        $('#showModal').on('shown.bs.modal', function () {
            $('#horariumtable').DataTable().columns.adjust().draw();
        });
    
    

        
    });

var checkAll = document.getElementById("checkAll");
if (checkAll) {
    checkAll.onclick = function () {
        var checkboxes = document.querySelectorAll('.form-check-all input[type="checkbox"]');
        if (checkAll.checked == true) {
            Array.from(checkboxes).forEach(function (checkbox) {
                checkbox.checked = true;
                checkbox.closest("tr").classList.add("table-active");
            });
        } else {
            Array.from(checkboxes).forEach(function (checkbox) {
                checkbox.checked = false;
                checkbox.closest("tr").classList.remove("table-active");
            });
        }
    };
}

var perPage = 8;

//Table
var options = {
    valueNames: [
        "id_pegawai",
        "nama",
        "tgl_lahir",
        "jenis_kelamin",
        "alamat",
        "cabang",
                "telepon",
                        "email",
                                "jabatan",
                                        "akses",
    ],
    page: perPage,
    pagination: true,
    plugins: [
        ListPagination({
            left: 2,
            right: 2
        })
    ]
};
// Init list
if (document.getElementById("kepegawaianList"))
    var kepegawaianList = new List("kepegawaianList", options).on("updated", function (list) {
        list.matchingItems.length == 0 ?
            (document.getElementsByClassName("noresult")[0].style.display = "block") :
            (document.getElementsByClassName("noresult")[0].style.display = "none");
        var isFirst = list.i == 1;
        var isLast = list.i > list.matchingItems.length - list.page;
        // make the Prev and Nex buttons disabled on first and last pages accordingly
        (document.querySelector(".pagination-prev.disabled")) ? document.querySelector(".pagination-prev.disabled").classList.remove("disabled"): '';
        (document.querySelector(".pagination-next.disabled")) ? document.querySelector(".pagination-next.disabled").classList.remove("disabled"): '';
        if (isFirst) {
            document.querySelector(".pagination-prev").classList.add("disabled");
        }
        if (isLast) {
            document.querySelector(".pagination-next").classList.add("disabled");
        }
        if (list.matchingItems.length <= perPage) {
            document.querySelector(".pagination-wrap").style.display = "none";
        } else {
            document.querySelector(".pagination-wrap").style.display = "flex";
        }

        if (list.matchingItems.length == perPage) {
            document.querySelector(".pagination.listjs-pagination").firstElementChild.children[0].click()
        }

        if (list.matchingItems.length > 0) {
            document.getElementsByClassName("noresult")[0].style.display = "none";
        } else {
            document.getElementsByClassName("noresult")[0].style.display = "block";
        }
    });

const xhttp = new XMLHttpRequest();
xhttp.onload = function () {
  var json_records = JSON.parse(this.responseText);
  Array.from(json_records).forEach(raw => {
    kepegawaianList.add({
      id_pegawai: '<a href="javascript:void(0);" class="fw-medium link-primary">#VZ'+raw.id_pegawai+"</a>",
      nama: raw.nama,
      tgl_lahir: raw.tgl_lahir,
      jenis_kelamin: raw.jenis_kelamin,
      alamat: raw.alamat,
       cabang: raw.cabang,
                telepon: raw.telepon,
                        email: raw.email,
                                jabatan: raw.jabatan,
                                        akses: raw.akses//,
      //status: isStatus(raw.status)
    });
    kepegawaianList.sort('id_pegawai', { order: "desc" });
    refreshCallbacks();
  });
  kepegawaianList.remove("id_pegawai", '<a href="javascript:void(0);" class="fw-medium link-primary">#VZ2101</a>');
}
// xhttp.open("GET", "assets/json/table-customer-list.json");
xhttp.open("GET", "http://localhost:3001/api/pegawai");
xhttp.send();

isCount = new DOMParser().parseFromString(
    kepegawaianList.items.slice(-1)[0]._values.id_pegawai,
    "text/html"
);

var isValue = isCount.body.firstElementChild.innerHTML;

var idField = document.getElementById("id-field"),
    customerNameField = document.getElementById("customername-field"),
    emailField = document.getElementById("email-field"),
    dateField = document.getElementById("date-field"),
    phoneField = document.getElementById("phone-field"),
    statusField = document.getElementById("status-field"),
    addBtn = document.getElementById("add-btn"),
    editBtn = document.getElementById("edit-btn"),
    removeBtns = document.getElementsByClassName("remove-item-btn"),
    editBtns = document.getElementsByClassName("edit-item-btn"),
     idpegawai     = document.getElementById("idpegawai"),
 nik           = document.getElementById("nik"),
 nama          = document.getElementById("nama"),
 namabelakang  = document.getElementById("namabelakang"),
 tempat        = document.getElementById("tempat"),
 tgllahir      = document.getElementById("tgllahir"),
 alamat        = document.getElementById("alamat"),
 provinsi      = document.getElementById("provinsi"),
 kota          = document.getElementById("kota"),
 kecamatan     = document.getElementById("kecamatan"),
 desa          = document.getElementById("desa"),
 jeniskelamin  = document.getElementById("jeniskelamin"),
 wniwna        = document.getElementById("wniwna"),
 goldarah      = document.getElementById("goldarah"),
 status        = document.getElementById("status"),
 kantor        = document.getElementById("kantor"),
 agama         = document.getElementById("agama"),
 notelp        = document.getElementById("notelp"),
 email         = document.getElementById("email"),

 pendidikan        = document.getElementById("pendidikan"),
 alumni        = document.getElementById("alumni"),
 tahunlulus         = document.getElementById("tahunlulus"),
 jurusan        = document.getElementById("jurusan"),
 jabatan         = document.getElementById("jabatan"),
 department        = document.getElementById("department"),
 mulaikontrak        = document.getElementById("mulaikontrak"),
 mulaibekerja         = document.getElementById("mulaibekerja"),
 statuspegawai        = document.getElementById("statuspegawai"),
 jumlahcuti         = document.getElementById("jumlahcuti"),
 daruratnama        = document.getElementById("daruratnama"),
 darurathubungan        = document.getElementById("darurathubungan"),
 daruratnotelp         = document.getElementById("daruratnotelp");

refreshCallbacks();
//filterContact("All");

function filterContact(isValue) {
    var values_status = isValue;/*
    kepegawaianList.filter(function (data) {
        var statusFilter = false;
        matchData = new DOMParser().parseFromString(
            data.values().status,
            "text/html"
        );
        var status = matchData.body.firstElementChild.innerHTML;
        if (status == "All" || values_status == "All") {
            statusFilter = true;
        } else {
            statusFilter = status == values_status;
        }
        return statusFilter;
    });
*/
    kepegawaianList.update();
}

function updateList() {
    var values_status = document.querySelector("input[name=status]:checked").value;
    data = userList.filter(function (item) {
        var statusFilter = false;

        if (values_status == "All") {
            statusFilter = true;
        } else {
            statusFilter = item.values().sts == values_status;
            console.log(statusFilter, "statusFilter");
        }
        return statusFilter;
    });
    userList.update();
}

if (document.getElementById("showModal")) {
    document.getElementById("showModal").addEventListener("show.bs.modal", function (e) {
        if (e.relatedTarget.classList.contains("edit-item-btn")) {
            document.getElementById("exampleModalLabel").innerHTML = "Edit Kepegawaian";
            document.getElementById("showModal").querySelector(".modal-footer").style.display = "block";
            document.getElementById("add-btn").style.display = "none";
            document.getElementById("edit-btn").style.display = "block";
        } else if (e.relatedTarget.classList.contains("add-btn")) {
            document.getElementById("exampleModalLabel").innerHTML = "Kepegawaian";
            document.getElementById("showModal").querySelector(".modal-footer").style.display = "block";
            document.getElementById("edit-btn").style.display = "none";
            document.getElementById("add-btn").style.display = "block";
        } else {
            document.getElementById("exampleModalLabel").innerHTML = "List Kepegawaian";
            document.getElementById("showModal").querySelector(".modal-footer").style.display = "none";
        }
    });
    ischeckboxcheck();

    document.getElementById("showModal").addEventListener("hidden.bs.modal", function () {
        clearFields();
    });
}
document.querySelector("#kepegawaianList").addEventListener("click", function () {
    refreshCallbacks();
    ischeckboxcheck();
});

var table = document.getElementById("customerTable");
// save all tr
var tr = table.getElementsByTagName("tr");
var trlist = table.querySelectorAll(".list tr");

var count = 11;
if (addBtn)

    addBtn.addEventListener("click",async function (e) {
       
    e.preventDefault();
        if (
          //  idpegawai.value !== "" &&
            nik.value !== "" &&
            nama.value !== ""/*&&
            namabelakang.value !== "" &&
            tempat.value !== "" &&
            tgllahir.value !== "" &&
            alamat.value !== "" &&
            provinsi.value !== "" &&
            kota.value !== "" &&
            kecamatan.value !== "" &&
            desa.value !== "" &&
            jeniskelamin.value !== "" &&
            wniwna.value !== "" &&
            goldarah.value !== "" &&
            status.value !== "" &&
            kantor.value !== "" &&
            agama.value !== "" &&
            notelp.value !== "" &&
            email.value !== "" */
        ) {
            try {
                const response = await fetch("http://localhost:3001/api/submit-pegawai", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                body: JSON.stringify({
                  //  req_idpegawai: idpegawai.value,
                    req_nik: nik.value,
                    req_nama: nama.value,
                    req_namabelakang: namabelakang.value,
                    req_tempat: tempat.value,
                    req_tgllahir: tgllahir.value,
                    req_alamat: alamat.value,
                    req_provinsi: provinsi.value,
                    req_kota: kota.value,
                    req_kecamatan: kecamatan.value,
                    req_desa: desa.value,
                    req_jeniskelamin: jeniskelamin.value,
                    req_wniwna: wniwna.value,
                    req_goldarah: goldarah.value,
                    req_status: status.value,
                    req_kantor: kantor.value,
                    req_agama: agama.value,
                    req_notelp: notelp.value,
                    req_email: email.value,
                    req_pendidikan: pendidikan.value,
                    req_alumni: alumni.value,
                    req_tahunlulus: tahunlulus.value,
                    req_jurusan: jurusan.value,
                    req_jabatan: jabatan.value,
                    req_department: department.value,
                    req_mulaikontrak: mulaikontrak.value,
                    req_mulaibekerja: mulaibekerja.value,
                    req_statuspegawai: statuspegawai.value,
                    req_jumlahcuti: jumlahcuti.value,
                    req_daruratnama: daruratnama.value,
                    req_darurathubungan: darurathubungan.value,
                    req_daruratnotelp: daruratnotelp.value
                })
                });
                const result = await response.json();
            kepegawaianList.add({
                id: '<a href="javascript:void(0);" class="fw-medium link-primary">#VZ'+count+"</a>",
                customer_name: idpegawai.value/*,
                email: emailField.value,
                date: dateField.value,
                phone: phoneField.value,
                status: isStatus(statusField.value),*/
            });
            kepegawaianList.sort('id', { order: "desc" });
            document.getElementById("close-modal").click();
            clearFields();
            refreshCallbacks();
            filterContact("All");
            count++;
                  if (result.success) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Customer inserted successfully!',
              showConfirmButton: false,
              timer: 2000,
              showCloseButton: true
            });}
                        }catch (error) {
                console.error("POST failed:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to add customer."
                });
            }
        }
    });
if (editBtn)
    editBtn.addEventListener("click", function (e) {
        document.getElementById("exampleModalLabel").innerHTML = "Edit Customer";
        var editValues = kepegawaianList.get({
            id: idField.value,
        });
        Array.from(editValues).forEach(function (x) {
            isid = new DOMParser().parseFromString(x._values.id, "text/html");
            var selectedid = isid.body.firstElementChild.innerHTML;
            if (selectedid == itemId) {
                x.values({
                    id: '<a href="javascript:void(0);" class="fw-medium link-primary">'+idField.value+"</a>",
                    customer_name: customerNameField.value,
                    email: emailField.value,
                    date: dateField.value,
                    phone: phoneField.value,
                    status: isStatus(statusField.value),
                });
            }
        });
        document.getElementById("close-modal").click();
        clearFields();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Customer updated Successfully!',
            showConfirmButton: false,
            timer: 2000,
            showCloseButton: true
        });
    });

//var statusVal = new Choices(statusField);

function isStatus(val) {
    switch (val) {
        case "Active":
            return (
                '<span class="badge badge-soft-success text-uppercase">' +
                val +
                "</span>"
            );
        case "Block":
            return (
                '<span class="badge badge-soft-danger text-uppercase">' +
                val +
                "</span>"
            );
    }
}

function ischeckboxcheck() {
    Array.from(document.getElementsByName("checkAll")).forEach(function (x) {
        x.addEventListener("click", function (e) {
            if (e.target.checked) {
                e.target.closest("tr").classList.add("table-active");
            } else {
                e.target.closest("tr").classList.remove("table-active");
            }
        });
    });
}

function refreshCallbacks() {
    if (removeBtns)
    Array.from(removeBtns).forEach(function (btn) {
            btn.addEventListener("click", function (e) {
                e.target.closest("tr").children[1].innerText;
                itemId = e.target.closest("tr").children[1].innerText;
                var itemValues = kepegawaianList.get({
                    id: itemId,
                });

                Array.from(itemValues).forEach(function (x) {
                    deleteid = new DOMParser().parseFromString(x._values.id, "text/html");
                    var isElem = deleteid.body.firstElementChild;
                    var isdeleteid = deleteid.body.firstElementChild.innerHTML;
                    if (isdeleteid == itemId) {
                        document.getElementById("delete-record").addEventListener("click", function () {
                            kepegawaianList.remove("id", isElem.outerHTML);
                            document.getElementById("deleteRecordModal").click();
                        });
                    }
                });
            });
        });
    if (editBtn)
        Array.from(editBtns).forEach(function (btn) {
            btn.addEventListener("click", function (e) {
                e.target.closest("tr").children[1].innerText;
                itemId = e.target.closest("tr").children[1].innerText;
                var itemValues = kepegawaianList.get({
                    id: itemId,
                });

                Array.from(itemValues).forEach(function (x) {
                    isid = new DOMParser().parseFromString(x._values.id, "text/html");
                    var selectedid = isid.body.firstElementChild.innerHTML;
                    if (selectedid == itemId) {
                        idField.value = selectedid;
                        customerNameField.value = x._values.customer_name;
                        emailField.value = x._values.email;
                        dateField.value = x._values.date;
                        phoneField.value = x._values.phone;

                       // if (statusVal) statusVal.destroy();
                     //   statusVal = new Choices(statusField);
                        val = new DOMParser().parseFromString(x._values.status, "text/html");
                        var statusSelec = val.body.firstElementChild.innerHTML;
                       // statusVal.setChoiceByValue(statusSelec);

                        flatpickr("#date-field", {
                            // enableTime: true,
                            dateFormat: "d M, Y",
                            defaultDate: x._values.date,
                        });
                    }
                });
            });
        });
}

function clearFields() {
    nik.value = "";
    nama.value = "";

}

function deleteMultiple() {
  ids_array = [];
  var items = document.getElementsByName('chk_child');
  Array.from(items).forEach(function (ele) {
    if (ele.checked == true) {
      var trNode = ele.parentNode.parentNode.parentNode;
      var id = trNode.querySelector('.id a').innerHTML;
      ids_array.push(id);
    }
  });
  if (typeof ids_array !== 'undefined' && ids_array.length > 0) {
    if (confirm('Are you sure you want to delete this?')) {
        Array.from(ids_array).forEach(function (id) {
        kepegawaianList.remove("id", `<a href="javascript:void(0);" class="fw-medium link-primary">${id}</a>`);
      });
      document.getElementById('checkAll').checked = false;
    } else {
      return false;
    }
  } else {
    Swal.fire({
      title: 'Please select at least one checkbox',
      confirmButtonClass: 'btn btn-info',
      buttonsStyling: false,
      showCloseButton: true
    });
  }
}

if (document.querySelector(".pagination-next"))
    document.querySelector(".pagination-next").addEventListener("click", function () {
        (document.querySelector(".pagination.listjs-pagination")) ? (document.querySelector(".pagination.listjs-pagination").querySelector(".active")) ?
        document.querySelector(".pagination.listjs-pagination").querySelector(".active").nextElementSibling.children[0].click(): '': '';
    });
if (document.querySelector(".pagination-prev"))
    document.querySelector(".pagination-prev").addEventListener("click", function () {
        (document.querySelector(".pagination.listjs-pagination")) ? (document.querySelector(".pagination.listjs-pagination").querySelector(".active")) ?
        document.querySelector(".pagination.listjs-pagination").querySelector(".active").previousSibling.children[0].click(): '': '';
    });

// data- attribute example
var attroptions = {
    valueNames: [
        'name',
        'born',
        {
            data: ['id']
        },
        {
            attr: 'src',
            name: 'image'
        },
        {
            attr: 'href',
            name: 'link'
        },
        {
            attr: 'data-timestamp',
            name: 'timestamp'
        }
    ]
};
/*
var attrList = new List('users', attroptions);
attrList.add({
    name: 'Leia',
    born: '1954',
    image: 'assets/images/users/avatar-5.jpg',
    id: 5,
    timestamp: '67893'
}); */

// Existing List
var existOptionsList = {
    valueNames: ['contact-name', 'contact-message']
};
var existList = new List('contact-existing-list', existOptionsList);

// Fuzzy Search list
var fuzzySearchList = new List('fuzzysearch-list', {
    valueNames: ['name']
});

// pagination list
var paginationList = new List('pagination-list', {
    valueNames: ['pagi-list'],
    page: 3,
    pagination: true
});

/*

var dropzonePreviewNode = document.querySelector("#dropzone-preview-list");
dropzonePreviewNode.id = "";
if(dropzonePreviewNode){
    var previewTemplate = dropzonePreviewNode.parentNode.innerHTML;
    dropzonePreviewNode.parentNode.removeChild(dropzonePreviewNode);
    var dropzone = new Dropzone(".dropzone", {
        url: 'https://httpbin.org/post',
        method: "post",
        previewTemplate: previewTemplate,
        previewsContainer: "#dropzone-preview",
    });
}
*/
