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

# Endpoints

| Description | HTTP Verb | Endpoint |
| ------------- | ------------- | ------------- |
| [Get roles](#Get-roles) | GET | /api/v1/roles |
| [Sign up](#Sign-up) | POST | /api/v1/users/sign-up |
| [Sign in](#Sign-in) | POST | /api/v1/users/sign-in |
| [Get user profile](#Get-user-profile) | GET | /api/v1/users |

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