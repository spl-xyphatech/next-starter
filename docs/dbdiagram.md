// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

```sql
Enum merchant_status {
PENDING
APPROVED
REJECTED
}

Enum event_status {
ACTIVE
INACTIVE
EXPIRED
}

Enum event_request_status {
PENDING
APPROVED
REJECTED
}

Enum coupon_status {
AVAILABLE
CLAIMED
REDEEMED
EXPIRED
}

Table users {
id uuid [pk]
name varchar(256)
username varchar(256) [unique]
email varchar(256) [unique]
phone varchar [note: 'nullable']
password varchar
avatar varchar [note: 'nullable']
is_first_time boolean
created_by varchar [note: 'nullable']
updated_by varchar [note: 'nullable']
created_at timestamptz
updated_at timestamptz
deleted_at timestamptz [note: 'nullable']
role_id uuid

Indexes {
name
email
}
}

Table roles {
id uuid [pk]
code varchar [unique]
name varchar
description text [note: 'nullable']
created_by varchar [note: 'nullable']
updated_by varchar [note: 'nullable']
created_at timestamptz
updated_at timestamptz
deleted_at timestamptz [note: 'nullable']

Indexes {
name
}
}

Table permissions {
id uuid [pk]
module varchar
action varchar
description text [note: 'nullable']
created_by varchar [note: 'nullable']
updated_by varchar [note: 'nullable']
created_at timestamptz
updated_at timestamptz
deleted_at timestamptz [note: 'nullable']

Indexes {
(module, action) [unique]
}
}

Table role_permissions {
id uuid [pk]
role_id uuid
permission_id uuid
description text [note: 'nullable']
created_by varchar [note: 'nullable']
updated_by varchar [note: 'nullable']
created_at timestamptz
updated_at timestamptz
deleted_at timestamptz [note: 'nullable']
}

Table merchants {
id uuid [pk]
user_id uuid [unique]
name varchar(256)
description text [note: 'nullable']
address varchar(512) [note: 'nullable']
phone varchar(20) [note: 'nullable']
status merchant_status
rejected_reason text [note: 'nullable']
approved_at timestamptz [note: 'nullable']
approved_by varchar [note: 'nullable']
created_by varchar [note: 'nullable']
updated_by varchar [note: 'nullable']
created_at timestamptz
updated_at timestamptz
deleted_at timestamptz [note: 'nullable']

Indexes {
name
status
}
}

Table merchant_images {
id uuid [pk]
merchant_id uuid
url varchar(512)
sort_order int
created_by varchar [note: 'nullable']
updated_by varchar [note: 'nullable']
created_at timestamptz
updated_at timestamptz
deleted_at timestamptz [note: 'nullable']

Indexes {
merchant_id
}
}

Table customers {
id uuid [pk]
user_id uuid [unique]
social_provider varchar(50) [note: 'nullable']
social_id varchar(256) [note: 'nullable']
created_by varchar [note: 'nullable']
updated_by varchar [note: 'nullable']
created_at timestamptz
updated_at timestamptz
deleted_at timestamptz [note: 'nullable']
}

Table categories {
id uuid [pk]
code varchar(64) [unique]
name varchar(128)
description text [note: 'nullable']
is_active boolean
created_by varchar [note: 'nullable']
updated_by varchar [note: 'nullable']
created_at timestamptz
updated_at timestamptz
deleted_at timestamptz [note: 'nullable']

Indexes {
name
}
}

Table tags {
id uuid [pk]
code varchar(64) [unique]
name varchar(128)
description text [note: 'nullable']
is_active boolean
created_by varchar [note: 'nullable']
updated_by varchar [note: 'nullable']
created_at timestamptz
updated_at timestamptz
deleted_at timestamptz [note: 'nullable']

Indexes {
code
}
}

Table merchant_categories {
id uuid [pk]
merchant_id uuid
category_id uuid
created_by varchar [note: 'nullable']
created_at timestamptz

Indexes {
(merchant_id, category_id) [unique]
}
}

Table merchant_tags {
id uuid [pk]
merchant_id uuid
tag_id uuid
created_by varchar [note: 'nullable']
created_at timestamptz

Indexes {
(merchant_id, tag_id) [unique]
}
}

Table events {
id uuid [pk]
title varchar(256)
description text [note: 'nullable']
total_qty int
claimed_qty int
per_user_limit int
start_at timestamptz
expired_at timestamptz
status event_status
is_admin_event boolean
created_by varchar [note: 'nullable']
updated_by varchar [note: 'nullable']
created_at timestamptz
updated_at timestamptz
deleted_at timestamptz [note: 'nullable']

Indexes {
status
expired_at
}
}

Table event_merchants {
id uuid [pk]
event_id uuid
merchant_id uuid
qty_limit int [note: 'nullable']
claimed_qty int
created_by varchar [note: 'nullable']
created_at timestamptz

Indexes {
(event_id, merchant_id) [unique]
}
}

Table event_requests {
id uuid [pk]
merchant_id uuid
title varchar(256)
description text [note: 'nullable']
status event_request_status
event_id uuid [unique, note: 'nullable']
rejected_note text [note: 'nullable']
reviewed_at timestamptz [note: 'nullable']
reviewed_by varchar [note: 'nullable']
created_by varchar [note: 'nullable']
updated_by varchar [note: 'nullable']
created_at timestamptz
updated_at timestamptz
deleted_at timestamptz [note: 'nullable']

Indexes {
merchant_id
status
}
}

Table coupons {
id uuid [pk]
uuid uuid [unique]
event_id uuid
status coupon_status
created_by varchar [note: 'nullable']
updated_by varchar [note: 'nullable']
created_at timestamptz
updated_at timestamptz
deleted_at timestamptz [note: 'nullable']

Indexes {
event_id
status
}
}

Table customer_coupons {
id uuid [pk]
customer_id uuid
coupon_id uuid [unique]
claimed_at timestamptz
redeemed_at timestamptz [note: 'nullable']
redeemed_by uuid [note: 'nullable']
created_by varchar [note: 'nullable']
updated_by varchar [note: 'nullable']
created_at timestamptz
updated_at timestamptz

Indexes {
(customer_id, coupon_id) [unique]
customer_id
}
}

// ============================================================
// Relationships
// ============================================================

Ref: users.role_id > roles.id

Ref: role_permissions.role_id > roles.id
Ref: role_permissions.permission_id > permissions.id

Ref: merchants.user_id > users.id
Ref: merchant_images.merchant_id > merchants.id

Ref: customers.user_id > users.id

Ref: merchant_categories.merchant_id > merchants.id
Ref: merchant_categories.category_id > categories.id

Ref: merchant_tags.merchant_id > merchants.id
Ref: merchant_tags.tag_id > tags.id

Ref: event_merchants.event_id > events.id
Ref: event_merchants.merchant_id > merchants.id

Ref: event_requests.merchant_id > merchants.id
Ref: event_requests.event_id > events.id

Ref: coupons.event_id > events.id

Ref: customer_coupons.customer_id > customers.id
Ref: customer_coupons.coupon_id > coupons.id
```
