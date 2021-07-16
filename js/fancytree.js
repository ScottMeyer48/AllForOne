
$(document).ready(() => {	 
	$("#tree").fancytree({ // FancyTree - tree objet
		source: request_ajax('tree',username),
		debugLevel: 1, // 0:quiet, 1:errors, 2:warnings, 3:infos, 4:debug
		checkbox: false,
		quicksearch: true, // Navigate to next node by typing the first letters
		clickFolderMode: 3,
		keyPathSeparator: "/", // Used by node.getKeyPath() and tree.loadKeyPath()
		clickFolderMode: 4, // 1:activate, 2:expand, 3:activate and expand, 4:activate (dblclick expands)
		// autoCollapse: true,
		// tooltip: true, // Use title as tooltip (also a callback could be specified)
		// setExpanded: false,
		// node_i.setExpanded(true);
		// node.setExpanded();

		// node.load(true).done(function(){
		// 	node.setExpanded();
		//   }); FancytreeNode@_2[title='PERSONNAL'] FancytreeNode@_45[title='TEAM']  

		// beforeSelect: function(e, data) {
		// 	if( data.node.folder ){
		// 		console.log('no_folder');
		// 	  return false;
		// 	}
		// },

		// activate: function(e, data){
			// this_node = data.node;
			// fancytree_pass = 'yes';
			// $("#Information").text("Active node: " + data.node + ". attribute : " + data.node.data.attribute );
			// console.log("tree: " + this_node);
			// console.log("Active node: " + data.node + ". attribute : " + data.node.data.attribute);
		//   },

		// activate: function(e, data) {
			// $("#tree").text(data.node.title);
			// console.log('toto');
			//   },

		click: function (e, data) {
			node = data.node; // array
			node_full_path = node.getPath()
			// clog(node_full_path,'node_full_path');
			// clog(node,'node');
			
			if (!node.folder){ // it's a file
				var node_last = node_full_path.replace(/\/$/, "");// Supprimons l'éventuel dernier slash de l'URL
				var node_last = node_last.substring (node_last.lastIndexOf( "/" )+1 );// Gardons dans la variable queue_url uniquement la portion derrière le dernier slash de urlcourante
				node_path_parent = node_full_path.replace('/' + node_last, ""); // only full path folder
			}
			if (node.folder){ // it's a folder
				var node_last = node_full_path.replace(/\/$/, "");// Supprimons l'éventuel dernier slash de l'URL
				var node_last = node_last.substring (node_last.lastIndexOf( "/" )+1 );// Gardons dans la variable queue_url uniquement la portion derrière le dernier slash de urlcourante
				node_path_parent = node_full_path.replace('/' + node_last, ""); // only full path folder
			}
		},

		dblclick: function (event, data) {
			if (isDirty === true && !node.folder){ // if editing document AND don't folder 
				show_message('Enregistrer votre document avant !','warning')
				return;
			}

			if (!node.folder) // it's a file
				request_ajax('read',node_full_path);
		},

		icon: function(event, data) {
			return !data.node.isTopLevel();
		},
	});
	// addSampleButton({
	// 	label: "Sort tree",
	// 	newline: false,
	// 	code: function(){
	// 		var node = $.ui.fancytree.getTree("#tree").getRootNode();
	// 		node.sortChildren(null, true);
	// 	}
	// })
});

function request_ajax(fonction, title, content) {
	return $.post({
		data: { fonction: fonction, title: title , content: content},
		dataType: "json",
		url: 'admin/request_ajax.php',
		success: function(return_data) {
			if (return_data.fonction === 'tree'){
				if (return_data.title === 'Success'){
					// show_message(return_data.return_info,'warning');
				}else {
					show_message(return_data.title + ' : ' + return_data.return_info ,'warning');
					return;
				}
			}

			if (return_data.fonction === 'read'){
				if (return_data.title === 'Success'){
					editor.setData(return_data.content);
					isDirty = false;
					show_record('bt_record_cke', 'hide');
				}else{
					show_message(return_data.title + ' : ' + return_data.return_info ,'warning');
				}
				return 
			}

			if (return_data.fonction === 'write_file'){
				if (return_data.title === 'Success'){
					if (node.folder){
						newSibling = node.addChildren({
							title: return_data.content,
							folder: false,
							icon: "addon/skin-lion/icon_file.gif"
						});
					}else{
						newSibling = node.appendSibling({
							title: return_data.content,
							folder: false,
							icon: "addon/skin-lion/icon_file.gif"
						});
					}
					var sort_tree = $.ui.fancytree.getTree("#tree").getRootNode();
					sort_tree.sortChildren(null, true);
					sort_tree = '';
				}else{
					show_message(return_data.title + ' : ' + return_data.return_info ,'warning');
				}
				return 
			}

			if (return_data.fonction === 'write_folder'){
				if (return_data.title === 'Success'){
					newSibling = node.addChildren({ //node.appendSibling({
						title: return_data.content,
						folder: true
					});
					var sort_tree = $.ui.fancytree.getTree("#tree").getRootNode();
					sort_tree.sortChildren(null, true);
					sort_tree = '';
				}else{
					show_message(return_data.title + ' : ' + return_data.return_info ,'warning');
				}
				return 
			}

			if (return_data.fonction === 'delete'){
				if (return_data.title === 'Success'){
					node.remove();
				}else{
					show_message(return_data.title + ' : ' + return_data.return_info ,'warning');
				}
				return 
			}

			if (return_data.fonction === 'error'){
				show_message(return_data.title + ' : ' + return_data.return_info ,'warning');
			}

			if (return_data === null || return_data === ""){
				show_message('problem connection to server', 'warning');
			}
		},
		error: function(resultat, statut, erreur){
			console.log("Probléme de connection ?" + "Message d'erreur : " + erreur);
			// alert("Probléme de connection ?\nLes données du serveur n'ont pas était reçu ou ceux attendu.\nRafraichissez la page\n\n" + "Message d'erreur : " + erreur);
		},
	});
}

function tree_add_file() { // FancyTree - Add File 
	var inputname_user = prompt("Donner un nom", "");
	name_checked = check_name_file_folder(inputname_user);
	if (name_checked === 'error' || inputname_user === null) {	return; } // si l'entrée user n'est pas bon block le script

	if (node.folder) { // it's a folder
		request_ajax('write_file',node_full_path + '/' + name_checked);
	}
	else{
		request_ajax('write_file',node_path_parent + '/' + name_checked);
	}
}

function tree_add_folder() { // FancyTree - Add Folder 
	var inputname_user = prompt("Donner un nom", "");
	name_checked = check_name_file_folder(inputname_user);
	if (name_checked === 'error' || inputname_user === null) {	return; }

	if (node.folder) { // it's a folder
		request_ajax('write_folder',node_full_path + '/' + name_checked);
	}
	else{
		request_ajax('write_folder',node_path_parent + '/' + name_checked);
	}
}

function tree_delete_node() {
	request_ajax('delete',node_full_path);
}

function tree_add_file_child() {		// FancyTree - Add Sub-File Children
	var inputname_user = prompt("Donner un nom", "");
	name_checked = check_name_file_folder(inputname_user)
	if (name_checked === 'error' || inputname_user === null) {	return; }

	if (node.folder){	// if a folder, OK you can create sub-file
		newSibling = node.addChildren({
			title: name_checked,
			folder: false,
			icon: "addon/skin-lion/icon_file.gif"
		});
	}else{
		show_message('Sélectionner un dossier avant', 'warning');
	}
}

	
function tree_add_folder_child() { 	// FancyTree - Add Sub-Folder Children 
	var inputname_user = prompt("Donner un nom", "");
	name_checked = check_name_file_folder(inputname_user)
	if (name_checked === 'error' || inputname_user === null) {	return; }

	// var rootNode = $.ui.fancytree.getTree("#tree").getRootNode();

		// var tree = $.ui.fancytree.getTree("#tree");
		// node = tree.getActiveNode();
clog(node.folder);
	// click: function (e, data) {
		// if( data.node.folder ){
		if (node.folder){	// if a folder, OK you can create sub-folder
			newSibling = node.addChildren({
				title: name_checked,
				folder: true,
			});
		}else{
			show_message('Sélectionner un dossier avant', 'warning');
		}


	// var childNode = tree.addChildren({
		// tooltip: "This folder and all child nodes were added programmatically.",
		// keyss = tree.getNodeByKey()
		// nodeee = $.ui.fancytree.getTree("#tree").getActiveNode()
	// $.ui.fancytree.getTree("#tree").activateKey(nodeee);
	// data.tree.activateKey("Nouveau dossier")
	// document.getElementById('Information').title = nodeee;
	// $.ui.fancytree.getTree("#tree").activateKey("id4.3.2");
}



	// var tree = $.ui.fancytree.getTree("#tree");
	// var node = tree.getActiveNode();
	// var node_tmp = node.toString();
	
	// if (node_tmp.includes('PERSONNAL') || node_tmp.includes('TEAM') || node_tmp.includes(username)) {
	// 	show_message('Suppression impossible', 'warning')
	// }else{
	// 	node.remove();
	// }
	// var node_tmp = '';

	// node.remove();


	// var node = '';
	// console.log('>>> ' + node + ' /// ' + node_tmp);


		// var tree = $("#tree").fancytree("getTree");
	
	// OK FONCTIONNE - GET NODE
	// var tree = $.ui.fancytree.getTree("#tree");
	// node = tree.getActiveNode();
	// searchIDs = $('#tree').fancytree('getTree').getSelectedNodes();
	// console.log(node_active + 'coin : ' + searchIDs.toString());

	// searchIDs = '_17';
	// searchIDs = tree.getSelectedNodes();
	//first method - get previous element relative to the button
	// searchIDs = $(this).prev().fancytree("getSelectedNodes");
	 
     //second method - use array
    //  searchIDs = $("#tree").fancytree("getSelectedNodes");
	// var toString = Object.prototype.toString;
		// searchIDs.toString();

	// OK FONCTIONNE - GET NODE
	// var remove = []

    // $('#tree').fancytree("getRootNode").visit(function(node){
        // console.log('visit '+node.key+': '+node.title);
        // alert('visit '+node.key+': '+node.title);
		// node.remove()
	// });
        // if (node.selected) {
            // console.log('push '+node.key+': '+node.title);
            // remove.push(node.key)}
            // node.remove(node.key)}
            // node.remove()}
		// });

		// console.log('ici: ' + node)

	// DEPRECATED: Access jQuery UI widget methods and members:
	// var tree = $("#tree").fancytree("getTree", "#myTree");
	// var node = $.ui.fancytree.getTree("#tree").getActiveNode();

	// RECOMMENDED: Use the Fancytree object API
	// var tree = $.ui.fancytree.getTree("#myTree");
	// var node = tree.getActiveNode();

	// or you may already have stored the tree instance upon creation:
	// import {createTree, version} from 'jquery.fancytree'
	// const tree = createTree('#tree', { ... });
	// var node = tree.getActiveNode();

		// var tree = $("#tree").fancytree("getTree"),
		// selNodes = tree.getSelectedNodes();
	
		// selNodes.forEach(function(node) {
		// 	while( node.hasChildren() ) {
		// 		node.getFirstChild().moveTo(node.parent, "child");
		// 	}
		// 	node.remove();
		// });


	// node_active.forEach(function(node){
	// searchIDs.forEach(function(node){
		// $children = node.children;
		// if ($children!==null)node.parent.addChildren($children,node.getNextSibling());
			// node.remove();
	// });
	// $(function(){
		// var sampleSource = [
		// 	  { title: "Folder 1", folder: true, attribute:'folder', children: [
		// 		{ title: "Subnode 1.1", attribute:'Subnode1'},
		// 		{ title: "Subnode 1.2", attribute:'Subnode1'},
		// 		{ title: "Subnode 1.3", attribute:'Subnode1'}
		// 		]},
		// 	  { title: "Folder 2", expanded: true, children: [
		// 		{ title: "Subnode 2.1", attribute:'Subnode2'},
		// 		{ title: "Subnode 2.2", attribute:'Subnode2'},
		// 		{ title: "Subnode 2.3", attribute:'Subnode2'}
		// 		]},
		// 	  { title: "Lazy Folder", lazy: true }
		//   ];
	  
		//   $("#tree").fancytree({
		//   checkbox: true,
		// 	source: sampleSource,
			
		// 	lazyLoad: function(event, data) {
		// 	  data.result = { url: "sample1.json" };
		// 	},
		// 	  activate: function(event, data){
		// 		$("#statusLine").text("Active node: " + data.node + ". attribute : " + data.node.data.attribute );
		// 	  }
		//   });
		  
		//   $("#button1").click(function(event){
			// var tree = $("#tree").fancytree("getTree"),
			// 	node = tree.getActiveNode();
	  
			// searchIDs = tree.getSelectedNodes();
	  
			// searchIDs.forEach(function(node){
			//  $children = node.children;
			//  if ($children!==null)node.parent.addChildren($children,node.getNextSibling());
			//  node.remove();
			// });
		//   });
	//   });

function TREE_GET_1() { 				// TEST 
	var sort_tree = $.ui.fancytree.getTree("#tree").getRootNode();
	sort_tree.sortChildren(null, true);
// var testget;
	// var testget = $.ui.fancytree.getTree("#tree").generateFormElements();
	// $.ui.fancytree.getTree("#tree").generateFormElements();
	// alert("POST data:\n" + jQuery.param($(testget).serializeArray()));

	// console.log(JSON.stringify(testget));


	// var sourceTree = $("#tree").fancytree("getTree");
	// // var testget = sourceTree.visit();
	// var testget = sourceTree.toDict();
	
	// OK FONCTIONNE - recupere uniquement la fin
		// alert(node_active);  // FancytreeNode@_20[title='My Script']  

	// OK FONCTIONNE - recupere tout l'arbre
		// var tree = $.ui.fancytree.getTree("#tree");
		// var d = tree.toDict(true);
		// alert(JSON.stringify(d));


	// document.getElementById('editor').innerHTML = 'test';
	// CKEDITOR.instances[editor].setData('test')
	// CKEDITOR.instances.editor.setData('test ');
	// CKEDITOR.instances['editor'].setData('test')
	// CKEDITOR.instances.editor
	// editor.setData( '<p>Some text.</p>' );

}

function RECHARGE() {					// TEST 
	var width = document.getElementById('mySidebar').offsetWidth;
	alert(width);

	// Reload the tree from previous `source` option
	// tree.reload().done(function(){
	//   alert("reloaded");
	// });
	// Optionally pass new `source`:
	//   tree.reload({
	//     // url: ...
	//     source: {url: "ajax-tree-fs.json"},   // RICHARD - NE FONCTION PAS

	//   }).done(function(){
	//     alert("reloaded");
	//   });
}

function TEST1() { 						// TEST 
	alert('test'); 

	//  function(event, data){
					// var node = data.node;
					// FT.debug("activate: event=", event, ", data=", data);
					// if(!$.isEmptyObject(node.data)){
						// alert(node.data);
						// alert('123');
						// alert("custom node data: " + JSON.stringify(node.data));
					// }
					// alert('ici');
}

function TEST2() { 						// TEST 

	// document.getElementById('Information').title = test_cara_interdit;
	// document.getElementById('Information').title = titre;



	// Afficher les plugins en cours
	// document.write(Array.from(editor.ui.componentFactory.names()));

	// alert('fichier enregistrer');
	// alert($_POST['CK_FULL_FOR_POST']);

	// if (isset($_POST['CK_FULL_FOR_POST'])) {
	// 	if (empty($_POST['CK_FULL_FOR_POST'])) {							// si c'est vide 
	// 	}
	// 	else{
	// 		alert($_POST['CK_FULL_FOR_POST']);
	// 	}
	// }
	// var data = 'prout';
	// alert('coin ' + data + $_POST['editorData']);
}

// window.addEventListener("DOMContentLoaded", (event) => { 			// wait document full loaded
// 	document.getElementById("tree").oncontextmenu = (e) => { 
// 		e.preventDefault();											// desactivate right click mouse on table "myTable"
// 	}
// 	document.getElementById("context_menu").oncontextmenu = (e) => { 
// 		e.preventDefault();											// desactivate right click mouse on table "context_menu"
// 	}
// });

