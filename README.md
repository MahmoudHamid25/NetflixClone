
# **NetflixClone**

Period 2 Project in Data Processing  
**Students**: Sviatoslav Zubrytskyi, Joris Bacmks, Mahmoud Hamid

## **1. Setting Up the Local Environment**

Follow these steps to set up the local environment for development:

1. Navigate to the root folder of the project:
   ```bash
   cd /path/to/your/project
   ```

2. Install dependencies for the root project:
   ```bash
   npm install
   ```

3. Install dependencies for the API:
   ```bash
   cd apps/api && npm install
   ```

4. Set up your `.env` file by copying the example configuration:
   ```bash
   cp .env.example .env
   ```
   Ensure that all the necessary environment variables are set according to your local setup.

5. Install dependencies for the web app:
   ```bash
   cd ../web && npm install
   ```

6. Navigate back to the root folder and start the development server:
   ```bash
   cd ../.. && npm run dev
   ```

   Now you can access:
   - **Website** on [localhost:3000](http://localhost:3000)
   - **API** on [localhost:4000](http://localhost:4000)

---

## **2. Abstract Classes / Interfaces**

- We haven’t used `BaseController` or `BaseService` as abstract classes for our API. This is because NestJS's powerful CLI can generate CRUD routes automatically using the `nest g resource` command, eliminating the need for writing repetitive code youself, making `BaseController` unnecessary.
  
- However, we have used `BaseDto`, particularly for routes related to contents, such as **content**, **episodes**, **films**, **series**, and **seasons**. These DTOs include common fields shared across different content types, providing a structured approach to handling recurring data fields.

- We followed NestJS best practices, including extensive use of inheritance (`extends`) and were following NestJS best practices stated in their [docs](https://docs.nestjs.com/) .

---

## **3. Swagger Documentation**

The Swagger documentation for the API is available at:

- **Production**: [https://netflix-clone-fork-production.up.railway.app/api](https://netflix-clone-fork-production.up.railway.app/api)
- **Local**: [http://localhost:4000/api](http://localhost:4000/api)

---

## **4. Hosting**

- **Images & Videos**: Hosted on **Cloudinary**
- **PostgreSQL Database**: Hosted on **Railway**
- **NestJS API**: Deployed on **Railway**

---

## **5. Documentation**

- **Database Backup Plan** and **Class Diagram** can be found in the `/docs` folder of the project.
- **Entity Relationship Diagram (ERD)**: [Netflix-2 ERD](https://dbdiagram.io/d/Netflix-2-67402d2be9daa85aca579b3d)

---

## **6. Testing**

- **Contract Testing**: We’ve included Postman tests for contract validation. You can view the contract tests here:
  - [Contract Testing Postman Collection](https://netflix-clone-2126.postman.co/workspace/Netflix-clone-Workspace~5dc0d2cb-e31d-4aca-8622-93c250f21461/collection/41006917-0f858a1d-2579-4e5e-8b01-a11aa21ab850?action=share&creator=40996617)

- **Integrity Testing**: Integrity tests are included in the API, and can be executed in apps/api with:
  ```bash
  npm run test
