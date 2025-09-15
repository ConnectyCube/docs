---
title: User API
description: Enabling admins to monitor and administrating users.
head:
  - tag: title
    content: User API for administration | Connectycube
sidebar: 
    label: User
    order: 2
---

## Delete User

###### Endpoint
```
DELETE https://api.connectycube.com/admin/user/{user_id}
```


###### Request example

```bash
curl -X DELETE \
-H "CB-Administration-API-Key: <API_KEY>" \
https://api.connectycube.com/admin/user/32242
```

###### Response

```json
{
  "success": true
}
```