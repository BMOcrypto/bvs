// Copyright (c) 2018, VHRS and contributors
// For license information, please see license.txt

frappe.ui.form.on('Allocate Checks', {
	check: function(frm) {
        if(frm.doc.check != "Select"){
			frm.clear_table("allocate_checks_executive");
			frappe.call({
				"method":"bvs.background_verification.doctype.allocate_checks.allocate_checks.get_check",
				args: {
					"check":frm.doc.check
				},
				callback: function (r) {
					$.each(r.message, function(i, d) {
					if(r.message){
						// console.log(r.message)
						if(frm.doc.check == "Address Check"||"Education Check"||"Employment Check"||"Reference Check"||"Family Check"||"Identity Check"||"Civil Check"||"Criminal Check"){
							var row = frappe.model.add_child(frm.doc, "Allocate Checks Executive", "allocate_checks_executive");                    
							row.reference_doctype = d.check;
							row.reference_name = d.name;
							row.applicant = d.applicant_id;
							if(d.status == "Entry Completed"){
								row.status = "IQC Pending";
							} else if(d.status == "IQC Completed"){
									row.status = "Allocation Pending";
							} else if(d.status == "Allocation Completed"){
									row.status = "Execution Pending";
							} else if(d.status == "Execution Completed"){
									row.status = "QC Pending";
							}else{
									row.status = d.status;
							}
						}else if(frm.doc.check == "Verify Address Check"||"Verify Education Check"||"Verify Employment Check"||"Verify Reference Check"||"Verify Family Check"||"Verify Identity Check"||"Verify Other Checks") {
							var row = frappe.model.add_child(frm.doc, "Allocate Checks Executive", "allocate_checks_executive");                    
							row.reference_doctype = d.check;
							row.reference_name = d.name;
							row.applicant = d.applicant_id;
							row.status = d.status;
						}
					}
					});
					refresh_field("allocate_checks_executive");
				}
			});	
		}	     
	},
	status: function(frm) {
        if(frm.doc.check != "Select"){
			frm.clear_table("allocate_checks_executive");
			frappe.call({
				"method":"bvs.background_verification.doctype.allocate_checks.allocate_checks.status_filter",
				args: {
					"check":frm.doc.check,
					"status":frm.doc,status

				},
				callback: function (r) {
					$.each(r.message, function(i, d) {
					if(r.message){
						// console.log(r.message)
						if(frm.doc.status == "IQC Pending" && d.status == "Entry Completed"){
							if(frm.doc.check == "Address Check"||"Education Check"||"Employment Check"||"Reference Check"||"Family Check"||"Identity Check"||"Other Checks"){
								var row = frappe.model.add_child(frm.doc, "Allocate Checks Executive", "allocate_checks_executive");                    
								row.reference_doctype = d.check;
								row.reference_name = d.name;
								row.applicant = d.applicant_id;
								row.status = "IQC Pending";
							} 
						} else 	if(frm.doc.status == "Pending" && d.status == "Pending"){
							if(frm.doc.check == "Verify Address Check"||"Verify Education Check"||"Verify Employment Check"||"Verify Reference Check"||"Verify Family Check"||"Verify Identity Check"||"Verify Civil Checks"||"Verify Criminal Check"){
								var row = frappe.model.add_child(frm.doc, "Allocate Checks Executive", "allocate_checks_executive");                    
								row.reference_doctype = d.check;
								row.reference_name = d.name;
								row.applicant = d.applicant_id;
								row.status = d.status;
							} 
						} else if(frm.doc.status == "Insufficient" && d.status == "Insufficient"){
							if(frm.doc.check == "Verify Address Check"||"Verify Education Check"||"Verify Employment Check"||"Verify Reference Check"||"Verify Family Check"||"Verify Identity Check"||"Verify Civil Checks"||"Verify Criminal Check"){
								var row = frappe.model.add_child(frm.doc, "Allocate Checks Executive", "allocate_checks_executive");                    
								row.reference_doctype = d.check;
								row.reference_name = d.name;
								row.applicant = d.applicant_id;
								row.status = "Insufficient";
							} 
						}else if(frm.doc.status == "Allocation Pending" && d.status == "IQC Completed"){
							if(frm.doc.check == "Address Check"||"Education Check"||"Employment Check"||"Reference Check"||"Family Check"||"Identity Check"||"Other Checks"){
								var row = frappe.model.add_child(frm.doc, "Allocate Checks Executive", "allocate_checks_executive");                    
								row.reference_doctype = d.check;
								row.reference_name = d.name;
								row.applicant = d.applicant_id;
								row.status = "Allocation Pending";
							} 
						} else if(frm.doc.status == "Execution Pending" && d.status == "Allocation Completed"){
							if(frm.doc.check == "Address Check"||"Education Check"||"Employment Check"||"Reference Check"||"Family Check"||"Identity Check"||"Other Checks"){
								var row = frappe.model.add_child(frm.doc, "Allocate Checks Executive", "allocate_checks_executive");                    
								row.reference_doctype = d.check;
								row.reference_name = d.name;
								row.applicant = d.applicant_id;
								row.status = "Execution Pending";
							} 
						} else if(frm.doc.status == "QC Pending" && d.status == "Execution Completed"){
							if(frm.doc.check == "Address Check"||"Education Check"||"Employment Check"||"Reference Check"||"Family Check"||"Identity Check"||"Other Checks"){
								var row = frappe.model.add_child(frm.doc, "Allocate Checks Executive", "allocate_checks_executive");                    
								row.reference_doctype = d.check;
								row.reference_name = d.name;
								row.applicant = d.applicant_id;
								row.status = "QC Pending";
							} 
						}else if(frm.doc.status == "Entry Pending" && d.status == "Entry Pending"){
							if(frm.doc.check == "Address Check"||"Education Check"||"Employment Check"||"Reference Check"||"Family Check"||"Identity Check"||"Other Checks"){
								var row = frappe.model.add_child(frm.doc, "Allocate Checks Executive", "allocate_checks_executive");                    
								row.reference_doctype = d.check;
								row.reference_name = d.name;
								row.applicant = d.applicant_id;
								row.status = "Entry Pending";
							} 
						}
					}
					});
					refresh_field("allocate_checks_executive");
				}
			});	
		}	     
	},
	refresh_check: function(frm){
	   frm.clear_table("allocate_checks_executive")
    },	
	select_executive: function(frm, cdt, cdn) {		
		if(frm.doc.select_executive != ""){
		frappe.call({
			"method":"frappe.client.get",
			args: {
				doctype: "User",
				name: frm.doc.select_executive
			},
			callback: function (r) {
				$.each(cur_frm.doc.allocate_checks_executive || [], function(i, d) {
				if(r.message){
					d.allocated_to = r.message.email
				}
				});
				refresh_field("allocate_checks_executive");				
			}
		});
		} 	
	},
	refresh: function (frm) {
		frm.disable_save();
		// frm.disable_menu();
	},
	assign: function(frm){
		// var row = locals[cdt][cdn];
		frappe.call({
			"method":"bvs.background_verification.doctype.allocate_checks.allocate_checks.set_assign_to",
			args: {
				"checks_executive": frm.doc.allocate_checks_executive
			},
			callback: function(r){
                console.log(r.message)
			}
		})
	}
});


