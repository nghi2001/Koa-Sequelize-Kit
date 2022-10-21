# Doc API For KOA_SEQUELIZE_KIT Project

# ENV

- Node version: v16.15.0
    

# Setup

- tạo Database koaSequelizeKit
- gọi api initDB để tạo

## Task
## GET: /task
- Request
```json
    
```
- Response
# DES
```json
    {
        "count": {
            "type": "INTEGER",
            "des": "total rows"
        },
        "rows": [
            {
                "id": {
                    "type": "INTEGER",
                    "des": "id task"
                },
                "name": {
                    "type": "STRING",
                    "des": "title task"
                },
                "body": {
                    "type": "STRING",
                    "des": "task content"
                },
                "state": {
                    "type": "STRING",
                    "des": "task status"
                },
                "createAt": {
                    "type": "DATE",
                    "des": "date created"
                },
                "updateAt": {
                    "type": "DATE",
                    "des": "last time updated"
                },
                "comments":[
                    {
                        "id": {
                            "type": "INTEGER",
                            "des": "id comment"
                        },
                        "content": {
                            "type": "STRING",
                            "des": "comment content"
                        },
                        "TaskId": {
                            "type": "INTEGER",
                            "des": "id task"
                        },
                        "createAt": {
                            "type": "DATE",
                            "des": "date created"
                        },
                        "updateAt": {
                            "type": "DATE",
                            "des": "last time updated"
                        }
                    }
                ]
            }
        ]
    }
```
# Exam
```json
{
    "count": 1,
    "rows": [
        {
            "id": 3,
            "name": "bao cao sequelize",
            "body": "test",
            "outDate": null,
            "state": "TODO",
            "createdAt": "2022-10-20T09:47:50.880Z",
            "updatedAt": "2022-10-20T09:47:50.880Z",
            "comments": [
                {
                    "id": 10,
                    "content": "test 456",
                    "createdAt": "2022-10-20T09:56:04.681Z",
                    "updatedAt": "2022-10-20T09:56:04.681Z",
                    "TaskId": 3
                }
            ]
        }
    ]
}
```


## POST: /task

# Req
# des
```json
{
    "header":{
        "content-type": "application/json"
    },
    "body": {
        "name": {
            "type": "STRING",
            "des": "title task"
        },
        "body": {
            "type": "STRING",
            "des": "task content"
        }
    }
}
```
# exam
```json
{
    "name": "bao cao sequelize",
    "body": "test"
}
```

# Res
# des
```json
{
    "state": {
        "type": "STRING",
        "des": "task status"
    },
    "id": {
        "type": "INTEGER",
        "des": "id task"
    },
    "name": {
        "type": "STRING",
        "des": "title task"
    },
    "body": {
        "type": "STRING",
        "des": "task content"
    },
    "createAt": {
        "type": "DATE",
        "des": "date created"
    },
    "updateAt": {
        "type": "DATE",
        "des": "last time updated"
    },
    

}
```
# Exam
```json
{
    "state": "TODO",
    "id": 4,
    "name": "bao cao sequelize",
    "body": "test",
    "updatedAt": "2022-10-20T22:06:53.278Z",
    "createdAt": "2022-10-20T22:06:53.278Z",
}
```

## PUT /task/:id

# Req
# des
```json
{
    "params": {
        "id": {
            "type": "INTEGER",
            "des": "id task"
        }
    },
    "header":{
        "content-type": "application/json"
    },
    "body": {
        "name": {
            "type": "STRING",
            "des": "title task"
        },
        "body": {
            "type": "STRING",
            "des": "task content"
        }
    }
}
```
# exam
```json
{
    "name": "ajvnojadnvoadnvo",
    "state": "done"
}
```
# Res
# des
```json
[
    1
]
```
# exam 
```json
[
    1
]
```

## DELETE /task/:id

# Req
# des
```json
{
    "params": {
        "id": {
            "type": "INTEGER",
            "des": "id task"
        }
    }
}
```
# Res

# des
- success
```json
 1
```
- task not exist
```json
0
```
# exam
- success
```json
1
```
- fail
```json
0
```

### Comment
## GET /comment/:id

# req
# des
```json
{
    "params": {
        "id": {
            "type": "INTEGER",
            "des": "id task"
        }
    }
}
```

# res
# des

```json
{
    "count": {
        "type": "INTEGER",
        "des": "total comment response"
    },
    "rows": {
        [
            {
                "id": {
                    "type": "INTEGER",
                    "des": "id comment"
                },
                "content": {
                    "type": "STRING",
                    "des": "comment content"
                },
                "TaskId": {
                    "type": "INTEGER",
                    "des": "id task"
                },
                "createAt": {
                    "type": "DATE",
                    "des": "date created"
                },
                "updateAt": {
                    "type": "DATE",
                    "des": "last time updated"
                }
            }
        ]
    }
}
```
# exam
```json
{
    "count": 2,
    "rows": [
        {
            "id": 11,
            "content": "test 456",
            "createdAt": "2022-10-20T22:57:03.685Z",
            "updatedAt": "2022-10-20T22:57:03.685Z",
            "TaskId": 4
        },
        {
            "id": 12,
            "content": "test 456",
            "createdAt": "2022-10-20T22:57:04.432Z",
            "updatedAt": "2022-10-20T22:57:04.432Z",
            "TaskId": 4
        }
    ]
}
```

## POST: /comment

# Req
# des
```json
{
    "header":{
        "content-type": "application/json"
    },
    "body": {
        "content": {
            "type": "STRING",
            "des": "content comment"
        },
        "TaskId": {
            "type": "INTEGER",
            "des": "id task"
        }
    }
}
```
# exam
```json
{
    "content": "test 456",
    "TaskId": 4
}
```

# Res
# des
```json
{
    "id": {
        "type": "INTEGER",
        "des": "id comment"
    },
    "content": {
        "type": "STRING",
        "des": "content comment"
    },
    "TaskId": {
        "type": "INTEGER",
        "des": "id task"
    },
    "createAt": {
        "type": "DATE",
        "des": "date created"
    },
    "updateAt": {
        "type": "DATE",
        "des": "last time updated"
    },
    

}
```
# Exam
```json
{
    "id": 12,
    "content": "test 456",
    "TaskId": 4,
    "updatedAt": "2022-10-20T22:57:04.432Z",
    "createdAt": "2022-10-20T22:57:04.432Z"
}
```


## DELETE: /comment/:id

# Req
# des
```json
{
    "params": {
        "id": {
            "type": "INTEGER",
            "des": "id comment"
        }
    }
}
```

# Res
# des
- success
```json
1
```
- fail
```json
0
```
# Exam
- success
```json
1
```
- fail
```json
0
```

## PUT /comment/:id

# Req
# des
```json
{
    "params": {
        "id": {
            "type": "INTEGER",
            "des": "id comment"
        }
    },
    "header":{
        "content-type": "application/json"
    },
    "body": {
        "content": {
            "type": "STRING",
            "des": "content comment"
        }
    }
}
```
# exam
```json
{
    "content": "nghi"
}
```
# Res
# des
- success
```json
[
    1
]
```
- fail
```json
[
    0
]
```
# exam 
- success
```json
[
    1
]
```
- fail
```json
[
    0
]
```
