#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Genera el Manual de Marca y Rediseño de Experiencias Mendoza.

Uso:
    python manual_marca_experiencias_mendoza.py

El script es autocontenido: instala reportlab solo si no está disponible y
crea manual-marca-experiencias-mendoza.pdf en el directorio actual.
"""

import importlib.util
import subprocess
import sys


if importlib.util.find_spec("reportlab") is None:
    subprocess.run(
        [sys.executable, "-m", "pip", "install", "reportlab", "--quiet"],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import (
    BaseDocTemplate,
    Flowable,
    Frame,
    KeepTogether,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


# Paleta calculada sobre Malbec base HSL(344, 59%, 25%).
# Clara: S - 20, L + 5 -> HSL(344, 39%, 30%).
# Oscura: S + 20, L - 5 -> HSL(344, 79%, 20%).
MALBEC_BASE = colors.HexColor("#661A30")
MALBEC_LIGHT = colors.HexColor("#6A2F42")
MALBEC_DARK = colors.HexColor("#5B0B25")
MALBEC_WASH = colors.HexColor("#F3E9E5")
CREAM = colors.HexColor("#F5EFE7")
SAND = colors.HexColor("#E7D8C8")
WHITE = colors.HexColor("#FFFDFC")
INK = colors.HexColor("#2D2523")
MUTED = colors.HexColor("#756762")
GOLD = colors.HexColor("#B8843D")
GOLD_PALE = colors.HexColor("#E7C98C")
GREEN = colors.HexColor("#53675A")

PAGE_W, PAGE_H = A4
OUTPUT = "manual-marca-experiencias-mendoza.pdf"


class Rule(Flowable):
    def __init__(self, width=1, color=GOLD, gap=0):
        super().__init__()
        self.width, self.color, self.gap = width, color, gap
        self.height = gap + 2

    def draw(self):
        self.canv.setStrokeColor(self.color)
        self.canv.setLineWidth(self.width)
        self.canv.line(0, self.gap + 1, PAGE_W - 34 * mm, self.gap + 1)


class AccentDot(Flowable):
    def __init__(self, size=4 * mm):
        super().__init__()
        self.width = self.height = size

    def draw(self):
        self.canv.setFillColor(GOLD)
        self.canv.circle(self.width / 2, self.height / 2, self.width / 5, fill=1, stroke=0)


def p(text, style):
    return Paragraph(text, style)


styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name="Kicker", parent=styles["Normal"], fontName="Helvetica-Bold",
    fontSize=7.5, leading=10, textColor=GOLD, tracking=1.7,
    spaceAfter=3 * mm,
))
styles.add(ParagraphStyle(
    name="CoverTitle", parent=styles["Title"], fontName="Times-Bold",
    fontSize=37, leading=39, textColor=WHITE, alignment=TA_LEFT,
    spaceAfter=5 * mm,
))
styles.add(ParagraphStyle(
    name="CoverSub", parent=styles["Normal"], fontName="Helvetica",
    fontSize=11, leading=16, textColor=GOLD_PALE,
))
styles.add(ParagraphStyle(
    name="H1Editorial", parent=styles["Heading1"], fontName="Times-Bold",
    fontSize=25, leading=27, textColor=MALBEC_DARK, spaceAfter=3 * mm,
))
styles.add(ParagraphStyle(
    name="H2Editorial", parent=styles["Heading2"], fontName="Times-Bold",
    fontSize=14, leading=17, textColor=MALBEC_BASE, spaceBefore=2 * mm,
    spaceAfter=2 * mm,
))
styles.add(ParagraphStyle(
    name="BodyEditorial", parent=styles["BodyText"], fontName="Helvetica",
    fontSize=9.3, leading=13.2, textColor=INK, spaceAfter=2.5 * mm,
))
styles.add(ParagraphStyle(
    name="Small", parent=styles["BodyText"], fontName="Helvetica",
    fontSize=7.6, leading=10.4, textColor=MUTED,
))
styles.add(ParagraphStyle(
    name="CardTitle", parent=styles["Heading3"], fontName="Times-Bold",
    fontSize=12, leading=14, textColor=MALBEC_DARK, spaceAfter=1.5 * mm,
))
styles.add(ParagraphStyle(
    name="CardBody", parent=styles["BodyText"], fontName="Helvetica",
    fontSize=8, leading=10.8, textColor=INK,
))
styles.add(ParagraphStyle(
    name="Quote", parent=styles["BodyText"], fontName="Times-Italic",
    fontSize=12, leading=16, textColor=MALBEC_DARK, leftIndent=5 * mm,
    borderColor=GOLD, borderWidth=0, borderPadding=2 * mm,
))
styles.add(ParagraphStyle(
    name="TableCell", parent=styles["BodyText"], fontName="Helvetica",
    fontSize=8, leading=10.5, textColor=INK,
))
styles.add(ParagraphStyle(
    name="TableHead", parent=styles["BodyText"], fontName="Helvetica-Bold",
    fontSize=7.5, leading=9, textColor=WHITE,
))


def card(title, body, width, fill=WHITE, accent=GOLD):
    content = [[p(title, styles["CardTitle"])], [p(body, styles["CardBody"])]]
    t = Table(content, colWidths=[width], hAlign="LEFT")
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), fill),
        ("BOX", (0, 0), (-1, -1), 0.5, SAND),
        ("LINEBEFORE", (0, 0), (0, -1), 2.5, accent),
        ("LEFTPADDING", (0, 0), (-1, -1), 4 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 3 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm),
    ]))
    return t


def two_col(left, right, gap=7 * mm):
    t = Table([[left, right]], colWidths=[(PAGE_W - 34 * mm - gap) / 2] * 2)
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), gap),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return t


def page_decor(canvas, doc):
    if doc.page == 1:
        return
    canvas.saveState()
    canvas.setStrokeColor(SAND)
    canvas.setLineWidth(0.5)
    canvas.line(17 * mm, PAGE_H - 14 * mm, PAGE_W - 17 * mm, PAGE_H - 14 * mm)
    canvas.setFont("Helvetica-Bold", 7)
    canvas.setFillColor(MALBEC_BASE)
    canvas.drawString(17 * mm, PAGE_H - 10.5 * mm, "EXPERIENCIAS MENDOZA  /  MANUAL DE MARCA")
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(PAGE_W - 17 * mm, 10 * mm, f"{doc.page:02d}  ·  2026")
    canvas.restoreState()


class Manual(BaseDocTemplate):
    def __init__(self, filename):
        super().__init__(filename, pagesize=A4, leftMargin=17 * mm, rightMargin=17 * mm,
                         topMargin=21 * mm, bottomMargin=17 * mm, title="Manual de Marca — Experiencias Mendoza",
                         author="Experiencias Mendoza")
        frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height,
                      id="main", leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
        self.addPageTemplates([PageTemplate(id="editorial", frames=frame, onPage=page_decor)])


def build_story():
    story = []

    # 1 — Portada
    story += [Spacer(1, 24 * mm), p("MANUAL DE MARCA  /  REDISEÑO 01", styles["Kicker"])]
    cover = Table([
        [p("Experiencias<br/>Mendoza", styles["CoverTitle"])],
        [p("Hospitalidad con raíz, diseño con carácter.", styles["CoverSub"])],
        [Spacer(1, 25 * mm)],
        [p("Auditoría visual y propuesta de sistema para convertir una estadía en una experiencia que se recuerda.", styles["CoverSub"])],
    ], colWidths=[106 * mm], rowHeights=[None, None, None, None])
    cover.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), MALBEC_BASE),
        ("BOX", (0, 0), (-1, -1), 0, MALBEC_BASE),
        ("LEFTPADDING", (0, 0), (-1, -1), 9 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 9 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 9 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9 * mm),
    ]))
    story.append(cover)
    story += [Spacer(1, 28 * mm), p("BRUNO + HELIANA  ·  MENDOZA, ARGENTINA", styles["Kicker"]),
              Rule(color=GOLD), Spacer(1, 4 * mm),
              p("Dirección creativa: hacer visible el cuidado humano que ya existe detrás de cada reserva.", styles["Small"]),
              PageBreak()]

    # 2 — Auditoría
    story += [p("01  /  AUDITORÍA", styles["Kicker"]),
              p("Lo valioso ya está.<br/>Hay que darle una forma propia.", styles["H1Editorial"]),
              p("Experiencias Mendoza tiene un activo difícil de copiar: no vende solamente alojamiento, sino una llegada acompañada por personas reales. El rediseño debe organizar esa calidez sin volverla una interfaz genérica de tarjetas.", styles["BodyEditorial"]),
              Spacer(1, 2 * mm)]
    story.append(two_col(
        card("La ventaja humana", "Bruno y Heliana son la diferencia estratégica. Su presencia permite hablar de recomendaciones, criterio local y atención antes de que el huésped tenga que pedirla. La marca debe poner sus nombres, rostros y tono en primer plano.", 79 * mm, fill=colors.HexColor("#FBF6F0"), accent=GREEN),
        card("La fricción actual", "El subdominio de Vercel puede percibirse como una etapa técnica y no como una marca consolidada. Además, las listas planas de comodidades y servicios no expresan jerarquía, deseo ni el valor de lo que sucede alrededor de la casa.", 79 * mm, fill=WHITE, accent=MALBEC_BASE)
    ))
    story += [Spacer(1, 6 * mm), p("Diagnóstico en una frase", styles["H2Editorial"]),
              p("La propuesta tiene humanidad y territorio; el sistema visual todavía no los convierte en una señal de confianza premium.", styles["Quote"]),
              Spacer(1, 4 * mm)]
    audit_data = [
        [p("OBSERVACIÓN", styles["TableHead"]), p("OPORTUNIDAD DE DISEÑO", styles["TableHead"]), p("PRIORIDAD", styles["TableHead"])],
        [p("Oferta de servicios amplia: traslados, compras, degustaciones, parrillero y detalles regionales.", styles["TableCell"]), p("Pasar de inventario a curaduría: mostrar qué experiencia habilita cada servicio.", styles["TableCell"]), p("Alta", styles["TableCell"])],
        [p("La confianza depende de la coordinación personal de Bruno y Heliana.", styles["TableCell"]), p("Crear un módulo de anfitriones con retratos, roles y una promesa concreta de acompañamiento.", styles["TableCell"]), p("Alta", styles["TableCell"])],
        [p("El dominio técnico resta recordación cuando aparece en enlaces compartidos.", styles["TableCell"]), p("Consolidar el dominio principal experienciasmendoza.com en toda la comunicación y OG.", styles["TableCell"]), p("Media", styles["TableCell"])],
    ]
    audit = Table(audit_data, colWidths=[57 * mm, 73 * mm, 25 * mm], repeatRows=1)
    audit.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), MALBEC_BASE), ("GRID", (0, 0), (-1, -1), 0.35, SAND),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, colors.HexColor("#FAF5EF")]),
        ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 3 * mm),
        ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm), ("TOPPADDING", (0, 0), (-1, -1), 2.5 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5 * mm),
    ]))
    story += [audit, PageBreak()]

    # 3 — Sistema visual
    story += [p("02  /  SISTEMA VISUAL", styles["Kicker"]),
              p("Una identidad nacida<br/>del vino y la tierra.", styles["H1Editorial"]),
              p("El lenguaje combina una base cálida y silenciosa con un Malbec reservado para las decisiones importantes. La sensación buscada: refugio mendocino, criterio editorial y un toque de celebración.", styles["BodyEditorial"]),
              Spacer(1, 2 * mm)]
    palette = Table([
        [p("MALBEC BASE", styles["Small"]), p("CLARA", styles["Small"]), p("OSCURA", styles["Small"]), p("DORADO COSECHA", styles["Small"])],
        [p("HSL 344 · 59% · 25%<br/><font color='#661A30'>#661A30</font>", styles["TableCell"]), p("HSL 344 · 39% · 30%<br/>#6A2F42", styles["TableCell"]), p("HSL 344 · 79% · 20%<br/>#5B0B25", styles["TableCell"]), p("Acento cálido<br/>#B8843D", styles["TableCell"])],
    ], colWidths=[39 * mm] * 4)
    palette.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, -1), MALBEC_BASE), ("BACKGROUND", (1, 0), (1, -1), MALBEC_LIGHT),
        ("BACKGROUND", (2, 0), (2, -1), MALBEC_DARK), ("BACKGROUND", (3, 0), (3, -1), GOLD_PALE),
        ("TEXTCOLOR", (0, 0), (2, 0), WHITE), ("TEXTCOLOR", (3, 0), (3, 0), MALBEC_DARK),
        ("GRID", (0, 0), (-1, -1), 0.5, WHITE), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 3 * mm), ("TOPPADDING", (0, 0), (-1, -1), 3 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm),
    ]))
    story += [palette, Spacer(1, 6 * mm), two_col(
        card("Tipografía premium", "Titulares: Cormorant Garamond, con contraste, aire y una voz de lujo sereno. Cuerpo y UI: Plus Jakarta Sans, legible, contemporánea y amable. En el PDF se simula la pareja con Times + Helvetica; en web usar Google Fonts.", 79 * mm, fill=WHITE, accent=GOLD),
        card("Prompt para iconos", "“Set of 6 coherent vector icons for a boutique Mendoza hospitality brand: airport transfer, grocery pre-stocking, wine tasting, Argentine grill chef, regional gift, local guide; fine monoline, flat fills, Malbec #661A30, harvest gold #B8843D, cream background, rounded geometry, no text, no gradients, consistent 2px stroke, premium Pinterest editorial style.”", 79 * mm, fill=colors.HexColor("#FBF6F0"), accent=MALBEC_BASE)
    ), PageBreak()]

    # 4 — Plan de interfaz
    story += [p("03  /  PLAN DE INTERFAZ", styles["Kicker"]),
              p("Diseñar el recorrido,<br/>no solo la pantalla.", styles["H1Editorial"]),
              p("La nueva página debe llevar al visitante desde el deseo de Mendoza hasta una conversación concreta por WhatsApp, con una jerarquía visual clara y pequeños gestos de materialidad.", styles["BodyEditorial"]),
              two_col(
                  card("60% · fondo", "Crema / arena suave (#F5EFE7). Respiración, secciones amplias y fondos que recuerdan la luz de la cordillera.", 79 * mm, fill=CREAM, accent=GOLD),
                  card("20% + 20% · estructura / acción", "Blanco limpio para tarjetas y superficies. Malbec en CTA, titulares puntuales y WhatsApp; nunca como relleno dominante.", 79 * mm, fill=WHITE, accent=MALBEC_BASE)
              ), Spacer(1, 5 * mm), p("Bento Grid recomendado", styles["H2Editorial"])]
    bento = Table([
        [card("Degustaciones  /  héroe", "Tarjeta grande: recorrido guiado, vino y QR dentro de la casa. Imagen dominante y entrada a bodegas.", 79 * mm, fill=colors.HexColor("#FBF6F0"), accent=MALBEC_BASE), card("Parrillero", "Tarjeta alta: chef al fuego, menú y ocasión especial.", 51 * mm, fill=WHITE, accent=GOLD)],
        [card("Traslados + compras previas", "Dos módulos medianos: llegar sin fricción y encontrar lo esencial resuelto.", 79 * mm, fill=WHITE, accent=GREEN), card("Detalles regionales", "Módulo compacto para sumar una sorpresa mendocina.", 51 * mm, fill=WHITE, accent=GOLD)],
    ], colWidths=[82 * mm, 51 * mm], rowHeights=[31 * mm, 28 * mm])
    bento.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 3 * mm), ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3 * mm),
    ]))
    story += [bento, Spacer(1, 2 * mm), p("Materialidad y conversión", styles["H2Editorial"]),
              p("Usar niveles de elevación suaves (sombra equivalente a shadow-md / shadow-lg, bordes SAND y radios generosos) y micro-luces internas en botones: un degradado de 1px o highlight superior con opacidad baja, más un hover en Malbec claro. El CTA de WhatsApp debe sentirse táctil, no pegado al sistema.", styles["BodyEditorial"]),
              p("Open Graph para WhatsApp", styles["H2Editorial"]),
              p("Crear en Shots.so una imagen de 1200 × 630 px: foto cálida de la casa o una escena de anfitrión + vino, velo crema/Malbec para legibilidad y una sola promesa corta. Mantener logo y texto importante dentro de una zona segura central/derecha; evitar ubicarlos abajo a la izquierda porque WhatsApp y otras previsualizaciones pueden recortar esa zona. Exportar JPG optimizado, probar el enlace en WhatsApp y repetir la verificación después de publicar.", styles["BodyEditorial"]),
              Rule(color=GOLD), Spacer(1, 3 * mm),
              p("Norte de marca", styles["Kicker"]),
              p("“Llegás como huésped. Te vas sintiendo local.”", styles["Quote"])]
    return story


if __name__ == "__main__":
    Manual(OUTPUT).build(build_story())
    print(f"PDF creado: {OUTPUT}")

