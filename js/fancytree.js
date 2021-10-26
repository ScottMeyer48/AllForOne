
$(document).ready(() => {	 
	$("#tree").fancytree({ // FancyTree - tree objet
		source: request_ajax('tree',username),
		// extensions: ["contextMenu"],
		// extensions: ["clickPaging"],
		debugLevel: 1, // 0:quiet, 1:errors, 2:warnings, 3:infos, 4:debug
		checkbox: false,
		// quicksearch: true, // Navigate to next node by typing the first letters
		clickFolderMode: 3,
		keyPathSeparator: "/", // Used by node.getKeyPath() and tree.loadKeyPath()
		clickFolderMode: 3, // 1:activate, 2:expand, 3:activate and expand, 4:activate (dblclick expands)
		// keyboard: true, // Support keyboard navigation
		// autoCollapse: true,
		// tooltip: true, // Use title as tooltip (also a callback could be specified)
		// setExpanded: false,
		// node_i.setExpanded(true);
		// node.setExpanded();
		// selectMode: 3,

		init: function(event, data) {
			node = data.node; // array
			on_right_click = '';
			file_exist ='';
			cke_title_ini ='';

			if (!jQuery.isEmptyObject(last_open)) { // load last open document
				last_open_array = last_open.split('-'); // [0]=key [1]=path
				node_key_last = last_open_array[0];

				if (!jQuery.isEmptyObject(last_open_array[1])) {
					request_ajax('file_exist',last_open_array[1]);
					data.tree.activateKey(node_key_last);
				}else{
					data.tree.activateKey('_2');
					request_ajax('read','TEAM/.Help');
				}

				// $.ui.fancytree.getTree("#tree").activateKey(node_key_last);
				// $("#tree").fancytree("getTree").setFocus();

				// rebuild node and node_full_path for request read + node_path_parent for record button
				node = $.ui.fancytree.getTree("#tree").getNodeByKey(last_open_array[0]);
				node_full_path = node.getPath();
				node_last = node_full_path.replace(/\/$/, ""); // delete last slash
				node_last = node_last.substring (node_last.lastIndexOf( "/" )+1 ); // Get only last entry (allforone/demo/here => here)
				node_path_parent = node_full_path.replace('/' + node_last, ""); // Get parent path (allforone/demo)

				if (node_full_path === last_open_array[1]) { // check if last open exist again
					request_ajax('read',last_open_array[1]);
				}
				// clog(node_key_last, 'ini');
				// var tree = $.ui.fancytree.getTree("#myTree");
				// var node = tree.getActiveNode();
			}
		},
		// clickPaging: function (event, data) {
		// 	console.log('clickPaging');
		// },
		// keydown: function (event, data) {
		// mouse: function (event, data) {
		// 	console.log(event.which);
		// },
		// before

		click: function (event, data) {
			// if (toto = "toto"){
			// 	return;
			// }
			// buttonPressed = instanceOfMouseEvent.button
			// buttonPressed ='';
			// buttonPressed = instanceOfMouseEvent.buttons
			// let button = document.querySelector('#button');
			// let log = document.querySelector('#log');
			// document.addEventListener('mousedown', mousedown2);
			// buttonPressed = instanceOfMouseEvent.which
			// buttonPressed = button.addEventListener('mouseup', logMouseButton);
			// function mousedown2(){
			// 	console.log(event.buttons);
			// }
			// clog(buttonPressed);
			// console.log(event.button);

			// $.ui.fancytree.getNode(event)
			// tt = $.ui.fancytree.getEventTargetType(event.originalEvent);
			// tt = event.which;
			// tt1 = event.button;
			// tt2 = event.buttons;
			// tt = event.nodeClick;
			// tt = node.info(event.type);
			// tt = node.setSelected()
			// console.log(tt1 + ' - ' + tt2);
			// console.log(data.targetType);
			// console.log(tt);
			// console.log(event);
			// console.log(event.nodeClick);

			node = data.node; // array
			node_full_path = node.getPath();
			node_last = node_full_path.replace(/\/$/, ""); // delete last slash
			node_last = node_last.substring (node_last.lastIndexOf( "/" )+1 ); // Get only last entry (allforone/demo/here => here)
			node_path_parent = node_full_path.replace('/' + node_last, ""); // Get parent path (allforone/demo)
			// $("#tree").fancytree("getTree").getNodeByKey("_5").setActive();

			if (isDirty === true && !node.folder){ // if editing document AND don't folder 
				show_message('Enregistrer votre document avant !','warning')
				// $.ui.fancytree.getTree("#tree").activateKey(node_key_last); // RICHARD- Probléme fancytree exécute 
				// data.tree.activateKey(node_key_last);
				data.tree.activateKey(restore);
				// $("#tree").fancytree("getTree").getNodeByKey("_5").setActive();
				return;
			}else{
				node_key_last = node.key;
			}
			
			if (on_right_click == 'stop'){ 
				on_right_click = '';
				return;
			}
			
			if (!node.folder) { // it's a file
				// only for bt_record_cke ckeck "title cke" <=> "node_last" 
				node_full_path = node.getPath();
				node_last = node_full_path.replace(/\/$/, ""); // delete last slash
				node_last = node_last.substring (node_last.lastIndexOf( "/" )+1); // Get only last entry (allforone/demo/here => here)
				node_path_parent = node_full_path.replace('/' + node_last, ""); // Get parent path (allforone/demo)
				request_ajax('read',node_full_path);
			}
			// data.node.setTitle("ici " + "!");
			// node.title = "x";

			// if (!node.folder){ // it's a file
			// }
			// if (node.folder){ // it's a folder
				// var node_last = node_full_path.replace(/\/$/, ""); // delete last slash
				// var node_last = node_last.substring (node_last.lastIndexOf( "/" )+1 ); // Get only last entry (allforone/demo/here => here)
				// node_path_parent = node_full_path.replace('/' + node_last, ""); // Get parent path (allforone/demo) 
			// }
			// alert("ID: " + node.key);

			// test = node.getKeyPath()
			// test = $.ui.fancytree.getTree("#tree").node.key()
			// clog(node.key,'node.key');
			// $.ui.fancytree.getTree("#tree").activateKey('_5');
		},

		// dblclick: function (event, data) {
			// node = data.node; // array
			
			// if (isDirty === true && !node.folder){ // if editing document AND don't folder 
			// 	show_message('Enregistrer votre document avant !','warning')
			// 	$.ui.fancytree.getTree("#tree").activateKey(node_key_last);
			// 	return;
			// }
			
			// if (!node.folder) { // it's a file
			// 	node_key_last = node.key;
			// 	// only for bt_record_cke ckeck "title cke" <=> "node_last" 
			// 	node_full_path = node.getPath();
			// 	node_last = node_full_path.replace(/\/$/, ""); // delete last slash
			// 	node_last = node_last.substring (node_last.lastIndexOf( "/" )+1); // Get only last entry (allforone/demo/here => here)
			// 	node_path_parent = node_full_path.replace('/' + node_last, ""); // Get parent path (allforone/demo)
			// 	request_ajax('read',node_full_path);
			// }
		// },

		icon: function(event, data) {
			return !data.node.isTopLevel();
		},
	});
});

function request_ajax(fonction, title, content) {
	return $.post({
		data: { fonction: fonction, title: title , content: content},
		dataType: "json",
		url: 'request_ajax.php',
		success: function(return_data) {
			if (return_data.fonction === 'tree'){
				if (return_data.title === 'Success'){
					// show_message(return_data.return_info,'warning');
				}else {
					show_message(return_data.title + ' : ' + return_data.return_info ,'warning');
					return;
				}
			}

			if (return_data.fonction === 'write_cfg_user'){
				if (return_data.title === 'Fail'){
					console.log(return_data.return_info); // Quiet error
				}
			}
			if (return_data.fonction === 'file_exist'){
				if (return_data.title === 'not exist'){
					request_ajax('read','TEAM/.Help');
				}
			}

			if (return_data.fonction === 'read'){
				if (return_data.title === 'Success'){
					editor.setData(return_data.content);
					isDirty = false;
					bt_record_show('hide');
					menu_document_edit('read');
					request_ajax('write_cfg_user',username, node.key + '-' + node_full_path); // record last document open
					titlePlugin = editor.plugins.get( 'Title' );
					cke_title_ini = titlePlugin.getTitle();
					titlePlugin ='';
				}else{
					show_message(return_data.title + ' : ' + return_data.return_info ,'warning');
				}
				return 
			}

			if (return_data.fonction === 'write_add_file'){
				// clog(return_data, 'write_add_file ');

				if (return_data.title === 'Success'){
					// show_message(return_data.title + ' : record ' + return_data.content,'success');
					
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

			if (return_data.fonction === 'write_file'){
				clog(return_data, 'return_data dans write file');

				if (return_data.title === 'Success'){
					// show_message(return_data.title + ' : record ' + return_data.content,'success');
					
					if (typeof tree_node_action == 'undefined') {
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
					} else if (tree_node_action === 'no change'){
						tree_node_action ='';
						return;
					}
				}else{
					show_message(return_data.title + ' : ' + return_data.return_info ,'warning');
				}
				return 
			}

			if (return_data.fonction === 'rename_file_folder'){
				if (return_data.title === 'Success'){
					data.node.setTitle(return_data.content);
					show_message(return_data.title + ' : rename ' + return_data.content,'success');

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

			if (return_data === null || return_data === "" || return_data.fonction === 'Error server'){
				show_message(return_data.title + ' : ' + return_data.return_info ,'warning');
			}
		},

		error: function(resultat, statut, erreur){
			console.log("communication problems FancyTree, error => " + erreur);
		},
	});
}

function tree_add_file() { // FancyTree - Add File 
	var inputname_user = prompt("Donner un nom", "");
	name_checked = check_name_file_folder(inputname_user);
	// clog(name_checked, 'name_checked');

	if (name_checked === 'error'){ return; }
	// if (name_checked === 'error' || inputname_user === null) {	return; } // si l'entrée user n'est pas bon block le script

	if (node.folder) { // it's a folder
		request_ajax('write_add_file',node_full_path + '/' + name_checked);
		// clog(node_full_path);
	}
	else{
		// clog(node_path_parent);
		request_ajax('write_add_file',node_path_parent + '/' + name_checked);
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
	request_ajax('read','TEAM/.Help');
}


