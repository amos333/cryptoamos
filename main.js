$("#home,#reports,#about").click(function(e) {

    let tab = e.currentTarget.id;
    $('#content').empty();
    $('#content').append($("#" + tab + "_template").html());

    if (tab === 'reports') {
        createReport();
    }

    if (tab === 'home') {
        createHome();
    }
});

$('#content').append($("#home_template").html());
createHome();