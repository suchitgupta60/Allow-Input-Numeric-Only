    $('.ExportToExcel').click(function (e) {

        var tab_text = "<html xmlns:x='urn:schemas-microsoft-com:office:excel'>";
        tab_text = tab_text + "<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>";

            tab_text = tab_text + "<x:Name>Test Sheet</x:Name>";

            tab_text = tab_text + "<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>";
            tab_text = tab_text + "</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>";

            tab_text = tab_text + "<table><tr><th>Company</th><th>Contact</th><th>Country</th></tr><tr><td>Alfreds Futterkiste</td><td>Maria Anders</td><td>Germany</td></tr><tr><td>Centro comercial Moctezuma</td><td>Francisco Chang</td><td>Mexico</td></tr></table>";
            tab_text = tab_text + "</body></html>";

        var jsonText = JSON.stringify({ tab_text: tab_text});

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "C_Sharp_File.aspx/Export",
            data: jsonText,
            dataType: "json",
            success: function (data) {}

                var data_type = 'data:application/vnd.ms-excel';
                var ua = window.navigator.userAgent;
                var msie = ua.indexOf("MSIE ");

                if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                   if (window.navigator.msSaveBlob) {
                       var blob = new Blob([data.d], {
                           type: "application/csv;charset=utf-8;"
                       });
                       navigator.msSaveBlob(blob, 'ExportedExcelFile.xls');
                   }
                } else {
                   $('#Export').attr('href', data_type + ', ' + encodeURIComponent(data.d));
                   $('#Export').attr('download', 'ExportedExcelFile.xls');
                }
            },
            error: function (xhr, status, error) {
                alert("Error exporting the data. Error is:" + xhr.responseText);
            }
        });
    });