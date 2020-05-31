# API Dona Tu Suerte

_API hecha en Express - Node - Mongoose_

## Instalacion 

Renombrar archivo .env.sample a .env y completar las variables

```
$ git clone https://github.com/ekrenz-developer/DonaTuSuerte.git
$ cd DonaTuSuerte
$ npm install
$ npm run dev
```

## Demo Server

```
https://api-dona-tu-suerte.herokuapp.com
```

# Endpoints

| Description | HTTP Verb | Endpoint |
| ------------- | ------------- | ------------- |
| [Get roles](#Get-roles) | GET | /api/v1/roles |
| [Sign up](#Sign-up) | POST | /api/v1/users/sign-up |
| [Sign in](#Sign-in) | POST | /api/v1/users/sign-in |
| [Get user profile](#Get-user-profile) | GET | /api/v1/users |
| [Get an organization](#Get-an-organization) | GET | /api/v1/organizations/{id} |
| [Create an organization](#Create-an-organization) | POST | /api/v1/organizations |
| [Update an organization](#Update-an-organization) | PUT | /api/v1/organizations/{id} |
| [Delete an organization](#Delete-an-organization) | DELETE | /api/v1/organizations/{id} |
| [Get a store](#Get-a-store) | GET | /api/v1/stores/{id} |
| [Create a store](#Create-a-store) | POST | /api/v1/organizations/{id}/stores |
| [Update a store](#Update-a-store) | PUT | /api/v1/stores/{id} |
| [Delete a store](#Delete-a-store) | DELETE | /api/v1/organizations/{id}/stores/{id} |
| [Get draws](#Get-draws) | GET | /api/v1/draws |
| [Get a draw](#Get-a-draw) | GET | /api/v1/draws/{id} |
| [Create a draw](#Create-a-draw) | POST | /api/v1/stores/{id}/draws/{id} |
| [Update a draw](#Update-a-draw) | PUT | /api/v1/draws/{id} |
| [Delete a draw](#Delete-a-draw) | DELETE | /api/v1/stores/{id}/draws/{id} |
| [Enter a draw](#Enter-a-draw) | POST | /api/v1/draws/{id} |
| [Run a draw](#Run-a-draw) | POST | /api/v1/draws/{id}/run |

## Get roles

### Request

`
GET /api/v1/roles
`

### Response

```
{
    "error": false,
    "statusCode": 200,
    "total": 4,
    "data": [
        {
            "_id": "id",
            "description": "Administrator"
        },
        {
            "_id": "id",
            "description": "User"
        },
        {
            "_id": "id",
            "description": "Organization"
        },
        {
            "_id": "id",
            "description": "Checker"
        }
    ]
}
```

## Sign Up

### Request

`
POST /api/v1/users/sign-up
`

```
body: {
  "email": "mail@test.com",
  "password": "yourPass",
  "photo": "photo.jpg",
  "firstName": "prueba",
  "lastName": "prueba",
  "dateOfBirth": "2000-01-01",
  "country": String,
  "address": {
    "street": "street",
    "city": "city",
    "state": "state",
    "postalCode": "postalCode",
    "country": "country",
    "lat": "lat",
    "lon": "lon"
  }
  "phone": "1111111111",
  "conditions": true,
  "score": 1,
  "role": "idRole"
}
```

### Response

#### User role

```
{
  "error": false,
  "statusCode": 201,
  "data": {
    "_id": "id",
    "email": "mail@test.com",
    "password": "yourPass",
    "photo": "photo.jpg",
    "firstName": "prueba",
    "lastName": "prueba",
    "dateOfBirth": "2000-01-01",
    "country": String,
    "address": {
      "street": "street",
      "city": "city",
      "state": "state",
      "postalCode": "postalCode",
      "country": "country",
      "lat": "lat",
      "lon": "lon"
    },
    "phone": "1111111111",
    "conditions": true,
    "score": 1,
    "role": "idRole",
    "verified": true,
    "draws": [...]
  }
}
```

#### Organization role

```
{
  "error": false,
  "statusCode": 200,
  "data": {
    "_id": "id",
    "email": "mail@test.com",
    "password": "yourPass",
    "photo": "photo.jpg",
    "firstName": "prueba",
    "lastName": "prueba",
    "dateOfBirth": "2000-01-01",
    "country": String,
    "address": {
      "street": "street",
      "city": "city",
      "state": "state",
      "postalCode": "postalCode",
      "country": "country",
      "lat": "lat",
      "lon": "lon"
    }
    "phone": "1111111111",
    "conditions": true,
    "score": 1,
    "role": "idRole",
    "verified": true,
    "organizations": [...]
  }
}
```

## Sign In

### Request

`
POST /api/v1/users/sign-in
`

```
body: {
  "email": "mail@test.com",
  "password": "yourPass"
}
```

### Response

#### User role

```
{
  "error": false,
  "statusCode": 200,
  "data": {
    "_id": "id",
    "email": "mail@test.com",
    "password": "yourPass",
    "photo": "photo.jpg",
    "firstName": "prueba",
    "lastName": "prueba",
    "dateOfBirth": "2000-01-01",
    "country": String,
    "address": {
      "street": "street",
      "city": "city",
      "state": "state",
      "postalCode": "postalCode",
      "country": "country",
      "lat": "lat",
      "lon": "lon"
    },
    "phone": "1111111111",
    "conditions": true,
    "score": 1,
    "role": "idRole",
    "verified": true,
    "draws": [...]
  }
}
```

#### Organization role

```
{
  "error": false,
  "statusCode": 200,
  "data": {
    "_id": "id",
    "email": "mail@test.com",
    "password": "yourPass",
    "photo": "photo.jpg",
    "firstName": "prueba",
    "lastName": "prueba",
    "dateOfBirth": "2000-01-01",
    "country": String,
    "address": {
      "street": "street",
      "city": "city",
      "state": "state",
      "postalCode": "postalCode",
      "country": "country",
      "lat": "lat",
      "lon": "lon"
    }
    "phone": "1111111111",
    "conditions": true,
    "score": 1,
    "role": "idRole",
    "verified": true,
    "organizations": [...]
  }
}
```

## Get user profile

### Request

`
GET /api/v1/users
`

```
header: {
  "Authorization": "Bearer " <TOKEN>
}
```

### Response

#### User role

```
{
  "error": false,
  "statusCode": 200,
  "data": {
    "_id": "id",
    "email": "mail@test.com",
    "password": "yourPass",
    "photo": "photo.jpg",
    "firstName": "prueba",
    "lastName": "prueba",
    "dateOfBirth": "2000-01-01",
    "country": String,
    "address": {
      "street": "street",
      "city": "city",
      "state": "state",
      "postalCode": "postalCode",
      "country": "country",
      "lat": "lat",
      "lon": "lon"
    },
    "phone": "1111111111",
    "conditions": true,
    "score": 1,
    "role": "idRole",
    "verified": true,
    "draws": [...]
  }
}
```

#### Organization role

```
{
  "error": false,
  "statusCode": 200,
  "data": {
    "_id": "id",
    "email": "mail@test.com",
    "password": "yourPass",
    "photo": "photo.jpg",
    "firstName": "prueba",
    "lastName": "prueba",
    "dateOfBirth": "2000-01-01",
    "country": String,
    "address": {
      "street": "street",
      "city": "city",
      "state": "state",
      "postalCode": "postalCode",
      "country": "country",
      "lat": "lat",
      "lon": "lon"
    }
    "phone": "1111111111",
    "conditions": true,
    "score": 1,
    "role": "idRole",
    "verified": true,
    "organizations": [...]
  }
}
```

## Get an organization

### Request

`
GET /api/v1/organizations/{id}
`

```
header: {
  "Authorization": "Bearer " <TOKEN>
}
```

### Response

```
{
    "error": false,
    "statusCode": 200,
    "data": {
        "_id": "id",
        "cuit": "123123123",
        "name": "Sexshop URL",
        "status": {
            "_id": "id",
            "description": "description",
            "status": 1
        },
        "stores": [...]
    }
}
```
## Create an organization

### Request

`
POST /api/v1/organizations
`

```
header: {
  "Authorization": "Bearer " <TOKEN>
},
body: {
  "cuit": 123123123,
  "name": "organization_name"
}
```

### Response

```
{
    "error": false,
    "statusCode": 201,
    "data": {
        "_id": "id",
        "cuit": "1",
        "name": "org2",
        "status": {
            "_id": "id",
            "description": "description",
            "status": 1
        },
        "stores": [...],
    }
}
```

## Update an organization

### Request

`
PUT /api/v1/organizations/{id}
`

```
header: {
  "Authorization": "Bearer " <TOKEN>
},
body: {
  "cuit": 123123123,
  "name": "organization_name"
}
```

### Response

```
{
    "error": false,
    "statusCode": 201,
    "data": {
        "_id": "id",
        "cuit": "1",
        "name": "org2",
        "status": {
            "_id": "id",
            "description": "description",
            "status": 1
        },
        "stores": [...],
    }
}
```

## Delete an organization

### Request

`
DELETE /api/v1/organizations/{id}
`

```
header: {
  "Authorization": "Bearer " <TOKEN>
},
```

### Response

```
{
    "error": false,
    "deleted": true,
    "statusCode": 202,
    "data": {
        "_id": "id",
        "cuit": "123123",
        "name": "name",
        "status": {
            "_id": "id",
            "description": "description",
            "status": 1
        },
        "stores": [...]
    }
}
```

## Get a store

### Request

`
GET /api/v1/stores/{id}
`

```
header: {
  "Authorization": "Bearer " <TOKEN>
},
```

### Response

```
{
    "error": false,
    "statusCode": 200,
    "data": {
        "_id": "id",
        "name": "name",
        "address": {
          "street": "street",
          "city": "city",
          "state": "state",
          "postalCode": "postalCode",
          "country": "country",
          "lat": "lat",
          "lon": "lon"
        },
        "draws": [...]
    }
}
```

## Create a store

### Request

`
POST /api/v1/organizations/{id}/stores
`

```
header: {
  "Authorization": "Bearer " <TOKEN>
},
body: {
  "name": "name",
  "address": {
    "street": "street",
    "city": "city",
    "state": "state",
    "postalCode": "postalCode",
    "country": "country",
    "lat": "lat",
    "lon": "lon"
  }
}
```

### Response

```
{
  "error": false,
  "statusCode": 201,
  "data": {
    "_id": "id",
    "name": "name",
    "address": {
      "street": "street",
      "city": "city",
      "state": "state",
      "postalCode": "postalCode",
      "country": "country",
      "lat": "lat",
      "lon": "lon"
    },
    "draws": [...]
  }
}
```

## Update a store

### Request

`
PUT /api/v1/stores/{id}
`

```
header: {
  "Authorization": "Bearer " <TOKEN>
},
body: {
  "name": "name",
  "address": {
    "street": "street",
    "city": "city",
    "state": "state",
    "postalCode": "postalCode",
    "country": "country",
    "lat": "lat",
    "lon": "lon"
  }
}
```

### Response

```
{
  "error": false,
  "statusCode": 201,
  "data": {
    "_id": "id",
    "name": "name",
    "address": {
      "street": "street",
      "city": "city",
      "state": "state",
      "postalCode": "postalCode",
      "country": "country",
      "lat": "lat",
      "lon": "lon"
    },
    "draws": [...]
  }
}
```

## Delete a store

### Request

`
DELETE /api/v1/organizations/{id}/stores/{id}
`

```
header: {
  "Authorization": "Bearer " <TOKEN>
}
```

### Response

```
{
  "error": false,
  "statusCode": 201,
  "data": {
    "_id": "id",
    "name": "name",
    "address": {
      "street": "street",
      "city": "city",
      "state": "state",
      "postalCode": "postalCode",
      "country": "country",
      "lat": "lat",
      "lon": "lon"
    },
    "draws": [...]
  }
}
```

## Get draws

### Request

`
GET /api/v1/draws
`

```
header: {
  "Authorization": "Bearer " <TOKEN>
}
```

### Response

```
{
  "_id": "id",
  "description": "description",
  "photo": "",
  "raffles": [],
  "prize": 1000,
  "store": {...},
  "status": {...},
  "startDate": "2020-05-01",
  "endDate": "2020-05-20",
  "score": 50000,
  "winner": {...}
  "scoreRaffle": 250,
  "reqRaffles": 200,
  "createdAt": "2020-05-29T22:49:53.030Z",
  "updatedAt": "2020-05-29T22:49:53.030Z"
}
```

## Get a draw

### Request

`
GET /api/v1/draws/{id}
`

```
header: {
  "Authorization": "Bearer " <TOKEN>
}
```

### Response

```
{
  "_id": "id",
  "description": "description",
  "photo": "",
  "raffles": [],
  "prize": 1000,
  "store": {...},
  "status": {...},
  "startDate": "2020-05-01",
  "endDate": "2020-05-20",
  "score": 50000,
  "winner": {...}
  "scoreRaffle": 250,
  "reqRaffles": 200,
  "createdAt": "2020-05-29T22:49:53.030Z",
  "updatedAt": "2020-05-29T22:49:53.030Z"
}
```

## Create a draw

### Request

`
POST /api/v1/stores/{id}/draws
`

```
header: {
  "Authorization": "Bearer " <TOKEN>
},
body: {
  "description": "description",
  "prize": 1000,
  "photo": "photo.jpg"
}
```

### Response

```
{
  "_id": "id",
  "description": "description",
  "photo": "",
  "raffles": [],
  "prize": 1000,
  "store": {...},
  "status": {...},
  "startDate": "2020-05-01",
  "endDate": "2020-05-20",
  "score": 50000,
  "winner": {...}
  "scoreRaffle": 250,
  "reqRaffles": 200,
  "createdAt": "2020-05-29T22:49:53.030Z",
  "updatedAt": "2020-05-29T22:49:53.030Z"
}
```

## Update a draw

### Request

`
PUT /api/v1/draws/{id}
`

```
header: {
  "Authorization": "Bearer " <TOKEN>
},
body: {
  "_id": "id",
  "description": "description",
  "photo": "photo.jpg",
  "startDate": "2020-05-01",
  "endDate": "2020-05-20",
}
```

### Response

```
{
  "_id": "id",
  "description": "description",
  "photo": "",
  "raffles": [],
  "prize": 1000,
  "store": {...},
  "status": {...},
  "startDate": "2020-05-01",
  "endDate": "2020-05-20",
  "score": 50000,
  "winner": {...}
  "scoreRaffle": 250,
  "reqRaffles": 200,
  "createdAt": "2020-05-29T22:49:53.030Z",
  "updatedAt": "2020-05-29T22:49:53.030Z"
}
```

## Delete a draw

### Request

`
DELETE /api/v1/organizations/{id}/draws/{id}
`

```
header: {
  "Authorization": "Bearer " <TOKEN>
}
```

### Response

```
{
  "_id": "id",
  "description": "description",
  "photo": "",
  "raffles": [],
  "prize": 1000,
  "store": {...},
  "status": {...},
  "startDate": "2020-05-01",
  "endDate": "2020-05-20",
  "score": 50000,
  "winner": {...}
  "scoreRaffle": 250,
  "reqRaffles": 200,
  "createdAt": "2020-05-29T22:49:53.030Z",
  "updatedAt": "2020-05-29T22:49:53.030Z"
}
```

## Enter a draw

### Request

`
POST /api/v1/draws/{id}/enter
`

```
header: {
  "Authorization": "Bearer " <TOKEN>
},
body: {
  "countRaffles": 1
}
```

### Response

```
{
  "error": false,
  "statusCode": 200,
  "data": {
    "_id": "id",
    "email": "mail@test.com",
    "password": "yourPass",
    "photo": "photo.jpg",
    "firstName": "prueba",
    "lastName": "prueba",
    "dateOfBirth": "2000-01-01",
    "country": String,
    "address": {
      "street": "street",
      "city": "city",
      "state": "state",
      "postalCode": "postalCode",
      "country": "country",
      "lat": "lat",
      "lon": "lon"
    },
    "phone": "1111111111",
    "conditions": true,
    "score": 1,
    "role": {
      "_id": "id",
      "description": "role"
    },
    "verified": true,
    "draws": [
      {
        "photo": "",
        "raffles": [...],
        "_id": "id",
        "description": "Sorteo 1",
        "prize": 1000,
        "starDate": "2020-05-20T00:00:00.000Z",
        "endDate": "2020-06-20T23:59:59.000Z",
        "score": 50000,
        "status": {
          "_id": "id",
          "description": "description"
        },
        "store": {
          "_id": "id",
          "name": "sexe",
          "address": {
            "street": "22 Rue du Grenier Saint-Lazare",
            "city": "Paris",
            "state": "",
            "postalCode": "75003",
            "country": "France",
            "lat": "",
            "lon": ""
          }
        },
        "updatedAt": "2020-05-22T00:05:46.250Z",
        "scoreRaffle ": 250,
        "reqRaffles": 200
      }
    ]
  }
}
```

## Run a draw

### Request

`
POST /api/v1/draws/{id}/run
`

```
header: {
  "Authorization": "Bearer " <TOKEN>
}
```

### Response

```
{
  "error": false,
  "statusCode": 202,
  "data": {
    "photo": "photo",
    "raffles": [...],
    "_id": "id",
    "description": "desc",
    "prize": "prize,
    "status": "status",
    "score": 10,
    "scoreRaffle": 250,
    "reqRaffles": 3,
    "store": {...},
    "createdAt": "createAt",
    "updatedAt": "updatedAt",
    "winner": "user"
  }
}
```