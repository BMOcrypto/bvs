# -*- coding: utf-8 -*-
# Copyright (c) 2019, VHRS and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document


class GenerateSO(Document):
    pass


@frappe.whitelist()
def create_so(customer, delivery_date, project, item_code, qty):
    if customer:
        # selected_children = json.loads(selected_children)
        # for sc in selected_children:
                    # if __checked:
        so = frappe.new_doc("Sales Order")
        # so_items = so
        so.update({
            "customer": customer,
            "delivery_date": delivery_date,
            "project": project
        })
        row = so.append("items", {
            "item_code": item_code,
            "qty": qty
        })
        so.save(ignore_permissions=True)
    return so
