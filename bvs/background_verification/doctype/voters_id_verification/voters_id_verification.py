# -*- coding: utf-8 -*-
# Copyright (c) 2018, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class VotersIDVerification(Document):
	pass


@frappe.whitelist()
def get_status(applicant_id):
    status = frappe.db.get_value("Voters ID Verification", {"applicant_id": applicant_id}, "status")
    return status