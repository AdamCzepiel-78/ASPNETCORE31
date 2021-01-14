var dataTable;

$(document).ready(function () {
    console.log("Loaded");
    loadDataTable();

});

function loadDataTable() {
    dataTable = $("#DT_load").DataTable({
        "ajax": {
            "url": "/api/book",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "name", "width": "25%" },
            { "data": "author", "width": "25%" },
            { "data": "isbn", "width": "25%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                                <a href="/BookList/Edit/?id=${data}" class="btn btn-success text-white btn-sm" style="cursor:poinbter; width: 60px;">Edit </a>
                                <a href="#" onclick='Delete("/api/book?id=${data}");' type="button" class="btn btn-danger btn-sm" style="cursor:pointer; width: 60px;">Delete</a>
                            </div>`
                },
                "width": "25%"
            }
        ]
    });
}

function Delete(url) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    } else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    })
}