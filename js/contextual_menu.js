if (end_url == 'main.php'){
    var obj_contextual_menu = 'tree';
    node = '' // initialise var tree node for right click
    window.onload = function () {
        // desactivate right click mouse on table "context_menu"
        document.getElementById("context_menu").oncontextmenu = (e) => {e.preventDefault();}  
        // desactivate right click mouse on TREE
        // toto = 'stop';
        // if (toto == 'stop2'){
            // document.getElementById(obj_contextual_menu).onclick = (e) => {
            //     console.log('onclick');
            //     e.preventDefault();} 
            // document.getElementById(obj_contextual_menu).onmousedown = (e) => {
            //     console.log('onmousedown');
            //     e.preventDefault();} 
            // $('tree').click(false);
            document.getElementById(obj_contextual_menu).oncontextmenu = (e) => {e.preventDefault();} 


        // } 
        // document.getElementById("left_tree").oncontextmenu = (e) => {
            // console.log('click droit');
            // e.preventDefault();
        // } 
    }
}
if (end_url == 'admin.php'){
    var obj_contextual_menu = 'tab_context_menu';
    window.onload = function () {
        // desactivate right click mouse on table "context_menu"
        document.getElementById("context_menu").oncontextmenu = (e) => {e.preventDefault();}  
        // desactivate right click mouse on table 
        all_select = document.querySelectorAll('.tab_context_menu');
        for (let i = 0; i < all_select.length; ++i) {
            document.getElementsByClassName('tab_context_menu')[i].oncontextmenu = (e) => {e.preventDefault();}   
        }
    }
}
// bt_record_show('hide');


// window.addEventListener("DOMContentLoaded", (event) => { 			// wait document full loaded
    // all_select = document.querySelectorAll(obj_contextual_menu);
    // clog(all_select,'all_select');
    // all_select.forEach(myFunction2);
    // clog('lect');
    // function myFunction2(item, index) {
        // clog(index,'index');
        // clog('index');
        // document.getElementsByClassName("view_root")[index].style.display = "none";
        // document.getElementsByClassName("tab_no_context")[index].style.display = "none";
        // document.getElementById(obj_contextual_menu[index]).oncontextmenu = (e) => {e.preventDefault();}   // desactivate right click mouse on table "myTable" or "Tree" (fancy tree)
        // document.getElementById('tab_no_context'[0]).oncontextmenu = (e) => {e.preventDefault();}   // desactivate right click mouse on table "myTable" or "Tree" (fancy tree)
        // document.getElementsByClassName('tab_no_context'[0]).oncontextmenu = (e) => {e.preventDefault();}   // desactivate right click mouse on table "myTable" or "Tree" (fancy tree)
    // }

    // document.getElementsByClassName('tab_context_menu')[0].oncontextmenu = (e) => {e.preventDefault();}   // desactivate right click mouse on table "myTable" or "Tree" (fancy tree)

    // document.getElementById(obj_contextual_menu).oncontextmenu = (e) => {e.preventDefault();}   // desactivate right click mouse on table "myTable" or "Tree" (fancy tree)
//     document.getElementById("context_menu").oncontextmenu = (e) => {e.preventDefault();}        // desactivate right click mouse on table "context_menu"
// });

function right_click(x,ev) {
    if (ev.button == 2)         // 2 = right click mouse
    {
        on_right_click = 'stop'; // stop load page on right click (see fancytree.js) 
        var mouse_x = ev.clientX;
        var mouse_y = ev.clientY;
        document.elementFromPoint(mouse_x, mouse_y).click();
        
        if (obj_contextual_menu == ('tree') && node !== '') {
            
            // Disable contextuel menu on tree if editing cke editor
            if (context_menu == 'disable'){ return; }

            title_node = node.title;
            Height_tree = document.getElementById('ft-id-1').offsetHeight; // Hauteur de Treeview
            
            // If right click under FancyTree
            var myElement = document.querySelector("#ft-id-1"); 
            var position = getPosition(myElement);
            if ((mouse_y - position.y) > Height_tree || title_node === ('PERSONNAL')) {return;} 
            
            ct_menu = document.getElementById("context_menu");
            ct_menu.style.display = "block";    // show fancytree contextuel menu 

            // show delete elements
            document.getElementsByClassName("view_del")[0].style.display = "block";
            document.getElementsByClassName("view_folder")[0].style.display = "block";

            // hide elements 
            if (title_node === (username)) { // if click on folder user don't show add folder, file and delete
                document.getElementsByClassName("view_del")[0].style.display = "none";
            }else if (title_node === ('.Help')) {
                document.getElementsByClassName("view_folder")[0].style.display = "none";
                document.getElementsByClassName("view_del")[0].style.display = "none";
            }else if (title_node === ('TEAM')) {
                document.getElementsByClassName("view_del")[0].style.display = "none";
            }else if (!node.folder) { // if it's a file
                document.getElementsByClassName("view_folder")[0].style.display = "none";
            }

            // BLOCK axis Y contextuel menu to bottom windows
            var max_bottom = window.innerHeight - ct_menu.offsetHeight; // - height context_menu - top_menu 
            if ( mouse_y > max_bottom ) {ct_menu.style.top = max_bottom+"px";
            }else {ct_menu.style.top = mouse_y+"px";}
            ct_menu.style.left = mouse_x+"px";
        }
        
        // Active on table - page administration
        if (obj_contextual_menu == "tab_context_menu") {
            document.getElementById("context_menu").style.display = "block"; // show contextuel menu
            var box = document.getElementById("context_menu");
            box.style.left = mouse_x+"px";
            box.style.top = mouse_y+"px";

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

// Helper function to get an element's exact position
function getPosition(el) {
    // var xPos = 0;
    var yPos = 0;

    while (el) {
        if (el.tagName == "BODY") {
        // deal with browser quirks with body/window/document and page scroll
        // var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
        var yScroll = el.scrollTop || document.documentElement.scrollTop;

        // xPos += (el.offsetLeft - xScroll + el.clientLeft);
        yPos += (el.offsetTop - yScroll + el.clientTop);
        } else {
        // for all other non-BODY elements
        // xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPos += (el.offsetTop - el.scrollTop + el.clientTop);
        }

        el = el.offsetParent;
    }
    return {
        // x: xPos,
        y: yPos
    };
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