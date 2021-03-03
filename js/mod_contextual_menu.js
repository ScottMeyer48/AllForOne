window.addEventListener("DOMContentLoaded", (event) => { 			// wait document full loaded
    document.getElementById(obj_contextual_menu).oncontextmenu = (e) => { 
        e.preventDefault();											// desactivate right click mouse on table "myTable" or "Tree" (fancy tree)
    }
    document.getElementById("context_menu").oncontextmenu = (e) => { 
        e.preventDefault();											// desactivate right click mouse on table "context_menu"
    }

    // page administration : counts the number of entries
    if (obj_contextual_menu == "myTable") {
        var a = document.getElementById(obj_contextual_menu).getElementsByTagName("tr");
            for (var i=0; i<a.length; i++){
                b = a[i].getElementsByTagName("td");
                nb_users = (i+1);
                document.getElementById('title_list_users').innerHTML = "Liste des utilisateurs : (" + nb_users + ") (Clic droit sur la liste pour plus d'options)"; // compte le nombre d'entrée
            }
    }
    // initialise var for right click
    this_node = ''
});

function right_click(x,ev) {    // hover table user on right click show context menu
    if (ev.button == 2)         // 2 = right click mouse
    {
        var mouse_x = ev.clientX;
        var mouse_y = ev.clientY;
        document.elementFromPoint(mouse_x, mouse_y).click();
        var box = document.getElementById("context_menu");

        if (this_node !== '') {
            box.style.display = "block"; // show contextuel menu
            node_active = this_node;
            this_node = '';
        }

        // BLOCK axis Y contextuel menu to bottom windows
            var max_bottom = window.innerHeight - box.offsetHeight; // - height context_menu - top_menu 
            if ( mouse_y > max_bottom ) {box.style.top = max_bottom+"px";
            }else {box.style.top = mouse_y+"px";}
            box.style.left = mouse_x+"px";
        
        // Active on table - page administration
            if (obj_contextual_menu == "myTable") {
            // Get number column "b.length"
            var a = document.getElementById("myTable").getElementsByTagName("tr");
            for (var i=0; i<a.length; i++){
                b = a[i].getElementsByTagName("td");
                // c = "Nb de lignes :"+ (i+1) +" -  Nb de colonnes :"+b.length;
                // nb_users = (i+1);
                // document.getElementById('nb_users').innerHTML = nb_users;
            }
            // console.log(c);
            // console.log(b.length);
            // alert("Row index is: " + x.rowIndex);
            // function GetCellValues() {
            var table = document.getElementById('myTable');
            // for (var r = 0, n = table.rows.length; r < n; r++) {
                // for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
                    for (var r = 0, n = b.length; r < n; r++) {
                        console.log(table.rows[x.rowIndex].cells[r].innerHTML);
                    }
                    // console.log(table.rows[r].cells[c].innerHTML);
                // }
            // }
            }
    }
}

function user_edit(){ // put row line to input form for edit
    alert('edit');
}

function user_del(){ // delete entry with method POST and reload page
    alert('sup');
}

{ // function topmenu_dropdown(num_dd)  // TOPMENU - SHOW/HIDE
    window.onclick = function(e) {				// Si click ailleurs sur la page
        // if (!e.target.matches('.dropbtn')) {	// si le lieu du click n'est pas le menu
        //     if (document.getElementById("myDropdown1").classList.contains('show')) {
        //         myDropdown1.classList.remove('show');
        //     }
        //     if (document.getElementById("myDropdown2").classList.contains('show')) {
        //         myDropdown2.classList.remove('show');
        //     }
        // }
        document.getElementById("context_menu").style.display = "none"; // hide contextuel menu
    }
}