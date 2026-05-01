# Pinterest Clone

API that allows users to upload and manage images

Run the project
```bash
   npm run dev
```
Server will start on `http://localhost:3000`

## API Endpoints
### Auth

**POST** `/auth/register` — Register a new user   
**POST** `/auth/login` — Login   
**POST** `/auth/logout` — Logout

### Photos

**GET** `/photos` — Get all photos
**GET** `/photos/:id` — Get a single photo 
**POST** `/photos` — Upload a photo (auth required)  
**DELETE** `/photos/:id` — Delete your photo (auth required)


