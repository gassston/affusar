import os

from fastapi import FastAPI
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, UJSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi import Request

# Initialize FastAPI app
app = FastAPI()

# Initialize Jinja2 Templates
templates = Jinja2Templates(directory=os.path.join(os.path.dirname(__file__), "templates"))
app.mount("/static", StaticFiles(directory=os.path.join(os.path.dirname(__file__), "static")), name="static")
app.mount("/data", StaticFiles(directory=os.path.join(os.path.dirname(__file__), "data")), name="data")
app.mount("/logos", StaticFiles(directory=os.path.join(os.path.dirname(__file__), "logos")), name="logos")


@app.get("/health", response_class=UJSONResponse, status_code=200)
async def health():
    return [{"health": "Ok"}]

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    # Render the HTML template
    return templates.TemplateResponse("home.html", {"request": request})

@app.get("/home", response_class=HTMLResponse)
async def read_home(request: Request):
    # Render the HTML template
    return templates.TemplateResponse("home.html", {"request": request})

@app.get("/elite", response_class=HTMLResponse)
async def read_elite(request: Request):
    # Render the HTML template
    return templates.TemplateResponse("elite.html", {"request": request})

@app.get("/a1", response_class=HTMLResponse)
async def read_a1(request: Request):
    # Render the HTML template
    return templates.TemplateResponse("a1.html", {"request": request})

@app.get("/a2z1", response_class=HTMLResponse)
async def read_a2z1(request: Request):
    # Render the HTML template
    return templates.TemplateResponse("a2z1.html", {"request": request})

@app.get("/a2z2", response_class=HTMLResponse)
async def read_a2z2(request: Request):
    # Render the HTML template
    return templates.TemplateResponse("a2z2.html", {"request": request})

@app.get("/senior", response_class=HTMLResponse)
async def read_senior(request: Request):
    # Render the HTML template
    return templates.TemplateResponse("senior.html", {"request": request})

@app.get("/veteranos", response_class=HTMLResponse)
async def read_veteranos(request: Request):
    # Render the HTML template
    return templates.TemplateResponse("veteranos.html", {"request": request})

@app.get("/femenino", response_class=HTMLResponse)
async def read_femenino(request: Request):
    # Render the HTML template
    return templates.TemplateResponse("femenino.html", {"request": request})

@app.get("/formativas/C-13", response_class=HTMLResponse)
async def read_c13(request: Request):
    # Render the HTML template
    return templates.TemplateResponse("/formativas/c13.html", {"request": request})

@app.get("/formativas/C-15", response_class=HTMLResponse)
async def read_c15(request: Request):
    # Render the HTML template
    return templates.TemplateResponse("/formativas/c15.html", {"request": request})

@app.get("/formativas/C-17", response_class=HTMLResponse)
async def read_c17(request: Request):
    # Render the HTML template
    return templates.TemplateResponse("/formativas/c17.html", {"request": request})

@app.get("/formativas/C-20-A1", response_class=HTMLResponse)
async def read_c20a1(request: Request):
    # Render the HTML template
    return templates.TemplateResponse("/formativas/c20a1.html", {"request": request})

@app.get("/formativas/C-20-A2", response_class=HTMLResponse)
async def read_c20a2(request: Request):
    # Render the HTML template
    return templates.TemplateResponse("/formativas/c20a2.html", {"request": request})