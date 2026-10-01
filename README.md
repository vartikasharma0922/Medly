
# Medly

Medly is a hospital care workspace for coordinating patient admissions, appointments, beds, ambulance requests, payments, and clinical reports.

![1](https://user-images.githubusercontent.com/100460788/215811132-40070d36-862a-4154-adc0-903c6fa65394.jpg)

## Tech Stack

**Client:** 

- **React**
- **Redux Thunk**
- **Axios**
- **Ant-Designs**

**Server:**

- **Node Js**
- **Mongo DB**
- **Express Js**
- **JWT**
- **Nodemailer**

## Deployment

- **Frontend:** Vercel
- **Backend API:** Railway

The frontend and backend deploy separately. Set Vercel's **Root Directory** to `frontend` and Railway's **Root Directory** to `backend`. The backend requires a MongoDB connection and a JWT secret. Configure `dbURL` and `key` in the Railway service variables; Railway provides `PORT` automatically. Set the frontend's `REACT_APP_API_URL` to the public Railway API URL in Vercel, then redeploy the frontend.

## Run locally

Prerequisites: Node.js and a running Medly backend API with MongoDB configured.

```bash
git clone https://github.com/vartikasharma0922/Medly.git
cd Medly/frontend
npm install
cp .env.example .env
npm start
```

The frontend defaults to `http://localhost:8080` for its API. Set `REACT_APP_API_URL` in `.env` if your backend runs elsewhere. The frontend opens at `http://localhost:3000`.

## Demo credentials

| Role | ID | Password |
| --- | --- | --- |
| Admin | 100 | masai |
| Doctor | 101 | masai |
| Nurse | 102 | masai |

## Features

- Admin controls
- Admitting Patients
- Booking beds and ambulance
- Creating appointments
- Generating reports 
- Overall control of hospital

## 🔗 Links

Source repository: https://github.com/vartikasharma0922/Medly

The Vercel and Railway deployment URLs have not been added yet.

## Original contributors

- [Piyush Agrawal](https://github.com/piyush-agrawal6)
- [Rajendra Patel](https://github.com/centauricoder01)
- [Salman Ajani](https://github.com/SalmanAjani)

## Screenshots

1.Dashboard

![31 01 2023_21 16 55_REC](https://user-images.githubusercontent.com/100460788/215808721-eb9f8778-53df-43fe-a1ab-662c0ff78c4f.png)

2.Profile

![31 01 2023_21 17 08_REC](https://user-images.githubusercontent.com/100460788/215808736-31e6dd9e-e5f3-4a48-9bbf-d505c27579c2.png)

3.Beds

![31 01 2023_21 17 21_REC](https://user-images.githubusercontent.com/100460788/215808740-af93a793-4a82-44c5-9eab-1bc11a6a6068.png)

4.Book appointment

![31 01 2023_21 17 43_REC](https://user-images.githubusercontent.com/100460788/215808744-417cbac9-eb6c-41d0-a4a9-414bb91cd03e.png)

5.Add profile

![31 01 2023_21 18 12_REC](https://user-images.githubusercontent.com/100460788/215808745-9813e61d-a13c-447f-b3c9-1f910ba8531f.png)

6.Add ambulance

![31 01 2023_21 18 30_REC](https://user-images.githubusercontent.com/100460788/215808748-9bb5d05d-afb1-41a3-9427-38089a28d0ed.png)

7.Login Page

![31 01 2023_21 15 44_REC](https://user-images.githubusercontent.com/100460788/215808752-4ebfb582-1db0-45e4-ac53-a87a5f1b75ea.png)

