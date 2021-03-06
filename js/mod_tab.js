window.addEventListener("DOMContentLoaded", (event) => { 			// wait document full loaded
    var a = document.getElementById("myTable").getElementsByTagName("tr");
    for (var i=0; i<a.length; i++){         // compte le nombre d'entrée
        b = a[i].getElementsByTagName("td");
        nb_users = (i+1);
        document.getElementById('title_list_users').innerHTML = "Liste des utilisateurs : (" + nb_users + ") (Clic droit sur la liste pour plus d'options)"; 
    }
});

function table_filtre(filter_col) { // hide line on demand filter 
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput" + filter_col);
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        // td = tr[i].getElementsByTagName("td")[0];
        td = tr[i].getElementsByTagName("td")[filter_col];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        } 
    }
    return
}

function sortTable(n) { // sort table
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc"; 
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 2; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount ++;      
        } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function test(){
    (function(){
        var temp=$("table.table_new th");
        $("table.myTable th").each(function(i,v) {
            temp[i].width=v.width;
        });
    });

    // $('td').each(function() {
        // tdWidth = $(this).width();
        // console.log(tdWidth);
        // if (tdWidth >= tdWidthLimit)
        // {    
        //     alert('hightlighted td width is ' + tdWidth);
        //     $(this).css({'background-color' : '#f00'});
        // }
    // });

    // JQUERY - Renomme "Next Step..." tous les boutons avec la class "continue" 
    // $( "button.continue" ).html( "Next Step..." )
}

{ // function topmenu_dropdown(num_dd)  // TOPMENU - SHOW/HIDE
    // function topmenu_dropdown(num_dd) { 		// Si click sur un bouton TOP MENU
    //     for (i = 1; i < 3; i++) {
    //         if (i === num_dd){ 					// affiche le DropDown demandé
    //             document.getElementById("myDropdown" + i).classList.toggle("show");
    //         }else{								// ferme tout les autres DropDown
    //             document.getElementById("myDropdown" + i).classList.remove("show");
    //         }
    //     }
    // }
    
    // window.onclick = function(e) {				// Si click ailleurs sur la page
    //     if (!e.target.matches('.dropbtn')) {	// si le lieu du click n'est pas le menu
    //         if (document.getElementById("myDropdown1").classList.contains('show')) {
    //             myDropdown1.classList.remove('show');
    //         }
    //         if (document.getElementById("myDropdown2").classList.contains('show')) {
    //             myDropdown2.classList.remove('show');
    //         }
    //     }
    // document.getElementById("context_menu").style.display = "none"; // hide contextuel menu
    // }
}