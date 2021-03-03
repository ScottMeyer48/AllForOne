$(document).ready(() => {   			// FancyTree - tree objet 
	$("#tree").fancytree({

		source: $.ajax({type: 'GET',
			url: 'load_tree_folder.php',
			data: 1,
			success: function(data) {
					return data
			},
			dataType:"json",
		}),

		// autoCollapse: true,
		checkbox: true,
		quicksearch: true, // Navigate to next node by typing the first letters
		// tooltip: true, // Use title as tooltip (also a callback could be specified)
		clickFolderMode: 3,
		keyPathSeparator: "/", // Used by node.getKeyPath() and tree.loadKeyPath()
		// setExpanded: false,
		clickFolderMode: 4, // 1:activate, 2:expand, 3:activate and expand, 4:activate (dblclick expands)
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
			this_node = data.node;
			// this_node = node.key;
			// this_node = node.title;
			// alert(data.node+" : ");

				// click: function () {
			// onmousedown="right_click(this,event)",
			// right_click(ev)
			// console.log('fancy click');
		// click: function (e, data) {
		// 	if( data.node.folder ){
		// 		console.log('yes_folder');
		// 	  return false;
			// }

			// var node = data.node;
			// var node = tree.getNodeByKey(key);
			// var toto = node.getKeyPath();
			// console.log(toto);

		// 	// using default options
		// 	//Caching DOM element
		// 	// var $myTree = $("#tree").fancytree();
		// 	// Get the DynaTree object instance
		// 	// var tree = $myTree.fancytree("getTree");
		// 	var tree = $.ui.fancytree.getTree("#tree");

		// 	//Set my key
		// 	var key = "_3";
		// 	//Get the node
		// 	var node = tree.getNodeByKey(key);
		// 	//Get the custom data attribute associated to that node
		// 	var data = node.data;
		// 	//data is an object so, data.content will give you the value of the attribute
			// console.log(data.content);
		},

		dblclick: function(event, data){
			var node = data.node;
				var data_convert = JSON.stringify(node.data); 	// convertir de JS en JSON
				// var data_convert = JSON.parse(data_convert);	// convertir de JSON en JS
				console.log(data_convert);
		},

		icon: function(event, data) {
			return !data.node.isTopLevel();
		},
	});

});

function TREE1_ADD_FILE() {				// FancyTree - Add Files 
	var tree = $.ui.fancytree.getTree("#tree");
	node = tree.getActiveNode();

	if (node){  // Si c'est différent de vide ou null
		newSibling = node.appendSibling({
			// imagePath: "addon/skin-lion/",
			title: "Nouveau fichier",
			folder: false,
			icon: "addon/skin-lion/icon_file.gif"
			// setSpanIcon(span, baseClass, icon)
		});
	};
}

function TREE1_ADD_FOLDER() { 			// FancyTree - Add Folder 
	var tree = $.ui.fancytree.getTree("#tree");
	node = tree.getActiveNode();

	if (node){  // Si c'est différent de vide ou null
		// newData = {title: "Nouveau Dossier"},
		newSibling = node.appendSibling({
		title: "Nouveau dossier",
		folder: true
		});
	};
}
	
function TREE1_ADD_FOLDER_CHILD() { 	// FancyTree - Add Folder Children 
	// var rootNode = $.ui.fancytree.getTree("#tree").getRootNode();
	var tree = $.ui.fancytree.getTree("#tree");
	node = tree.getActiveNode();

	// click: function (e, data) {
		// if( data.node.folder ){
		if ( node.folder ){	// if a folder OK, create sub-folder
			newSibling = node.addChildren({
				title: "Nouveau dossier",
				folder: true,
			});
		}else{
			show_message('Erreur: Sélectionner un dossier avant', 'warning')
		}


	// var childNode = tree.addChildren({
		// tooltip: "This folder and all child nodes were added programmatically.",
		// keyss = tree.getNodeByKey()
		// nodeee = $.ui.fancytree.getTree("#tree").getActiveNode()
	// $.ui.fancytree.getTree("#tree").activateKey(nodeee);
	// data.tree.activateKey("Nouveau dossier")
	// document.getElementById('Information').value = nodeee;
	// $.ui.fancytree.getTree("#tree").activateKey("id4.3.2");
}

function TREE1_DELETE_NODE() {
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
	var remove = []
    $('#tree').fancytree("getRootNode").visit(function(node){
        // console.log('visit '+node.key+': '+node.title);
        // alert('visit '+node.key+': '+node.title);
		// node.remove()
	// });
        if (node.selected) {
            // console.log('push '+node.key+': '+node.title);
            // remove.push(node.key)}
            // node.remove(node.key)}
            node.remove()}
		});

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
}

function TREE_GET_1() { 				// TEST 
	// var testget;
	// var testget = $.ui.fancytree.getTree("#tree").generateFormElements();
	// $.ui.fancytree.getTree("#tree").generateFormElements();
	// alert("POST data:\n" + jQuery.param($(testget).serializeArray()));

	// console.log(JSON.stringify(testget));


	// var sourceTree = $("#tree").fancytree("getTree");
	// // var testget = sourceTree.visit();
	// var testget = sourceTree.toDict();
	
	alert(node_active);  // FancytreeNode@_20[title='My Script']  

	// OK FONCTIONNE - recupere tout l'arbre
	// var tree = $.ui.fancytree.getTree("#tree");
		// var d = tree.toDict(true);
		// alert(JSON.stringify(d));
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

	// document.getElementById('Information').value = test_cara_interdit;
	// document.getElementById('Information').value = titre;



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

