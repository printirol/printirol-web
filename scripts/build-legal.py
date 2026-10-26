# Genera las páginas legales (terminos, privacidad, politica-de-envios, cancelaciones).
# Uso: python3 scripts/build-legal.py  (después, subir ?v= en los HTML si cambia el CSS)
import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VERSION = re.search(r'styles\.css\?v=(\d+)', (ROOT / 'index.html').read_text()).group(1)


def inline(text):
    text = html.escape(text, quote=False)
    text = re.sub(r'([\w.+-]+@printirol\.com)', r'<a href="mailto:\1">\1</a>', text)
    text = text.replace('+54 11 2391 9842', '<a href="https://wa.me/5491123919842" target="_blank" rel="noopener">+54 11 2391 9842</a>')
    return text


def render(blocks):
    out = []
    for kind, value in blocks:
        if kind == 'h2':
            out.append(f'<h2>{inline(value)}</h2>')
        elif kind == 'h3':
            out.append(f'<h3>{inline(value)}</h3>')
        elif kind == 'p':
            out.append(f'<p>{inline(value)}</p>')
        elif kind == 'ul':
            items = ''.join(f'<li>{inline(i)}</li>' for i in value)
            out.append(f'<ul>{items}</ul>')
        elif kind == 'ol':
            items = ''.join(f'<li>{inline(i)}</li>' for i in value)
            out.append(f'<ol>{items}</ol>')
        elif kind == 'table':
            head, *rows = value
            th = ''.join(f'<th>{inline(c)}</th>' for c in head)
            trs = ''.join('<tr>' + ''.join(f'<td>{inline(c)}</td>' for c in r) + '</tr>' for r in rows)
            out.append(f'<div class="legal-table"><table><thead><tr>{th}</tr></thead><tbody>{trs}</tbody></table></div>')
    return '\n          '.join(out)


PAGES = {
    'terminos.html': {
        'title': 'Términos y condiciones',
        'updated': 'Última actualización: 18/04/2026',
        'blocks': [
            ('p', 'Bienvenido a Printirol, una marca perteneciente a Palmico, con domicilio en Buenos Aires, Argentina. Al utilizar nuestro sitio web www.printirol.com y nuestros servicios, aceptás estos Términos y Condiciones. Si no estás de acuerdo, te pedimos que no utilices el sitio ni realices pedidos.'),
            ('h2', '1. Objeto'),
            ('p', 'Estos Términos regulan el uso del sitio web y la contratación de los productos ofrecidos por Printirol.'),
            ('h2', '2. Productos'),
            ('p', 'Todos los productos ofrecidos en Printirol son personalizados y se fabrican a pedido según las especificaciones proporcionadas por el cliente.'),
            ('ul', ['Antes de la producción, el cliente recibe un mockup digital para su aprobación.',
                    'La confirmación del pedido implica la aceptación del diseño, colores, tamaños y características.']),
            ('h2', '3. Proceso de compra'),
            ('ol', ['El cliente realiza el pedido en el sitio web, proporcionando los datos requeridos.',
                    'El pago se realiza mediante Mercado Pago.',
                    'Printirol inicia la producción una vez confirmado el pago y aprobados los diseños.',
                    'El pedido se despacha a través de Correo Argentino al domicilio indicado por el cliente.']),
            ('h2', '4. Precios'),
            ('p', 'Todos los precios están expresados en pesos argentinos (ARS) y pueden ser modificados sin previo aviso, salvo en pedidos ya confirmados.'),
            ('h2', '5. Pagos'),
            ('p', 'El pago se realiza exclusivamente mediante Mercado Pago.'),
            ('p', 'Printirol no almacena datos de tarjetas ni información financiera de los clientes.'),
            ('h2', '6. Envíos'),
            ('p', 'Los envíos se realizan mediante Correo Argentino. Printirol no es responsable por demoras, pérdidas o daños atribuibles a la empresa de correo, aunque asistiremos al cliente en el reclamo.'),
            ('p', 'El cliente es responsable de brindar una dirección correcta y completa. Si la dirección es incorrecta o insuficiente:'),
            ('ul', ['El paquete será devuelto por el correo.',
                    'El cliente deberá abonar el costo del reenvío.']),
            ('p', 'Los envíos no reclamados o rechazados se devuelven y el cliente debe asumir el costo de un nuevo envío si corresponde.'),
            ('h2', '7. Cambios y devoluciones'),
            ('p', 'Dado que los productos son personalizados, no se aceptan devoluciones ni cambios por arrepentimiento de compra.'),
            ('p', 'Se aceptarán reclamos únicamente en caso de:'),
            ('ul', ['Error en la estampa o personalización imputable a Printirol.',
                    'Falla de fabricación o defecto evidente.']),
            ('p', 'El reclamo debe hacerse dentro de los 30 días corridos desde la recepción del producto, enviando fotos y detalle del problema a contacto@printirol.com.'),
            ('p', 'Los reclamos por paquetes perdidos deben realizarse dentro de los 30 días posteriores a la fecha estimada de entrega.'),
            ('h2', '8. Propiedad intelectual'),
            ('p', 'Todos los diseños, imágenes, mockups y contenidos del sitio son propiedad de Printirol o sus respectivos autores. Prohibida su reproducción o uso sin autorización. Ver descargo legal.'),
            ('p', 'El cliente declara y garantiza que los diseños, logotipos, imágenes o textos enviados para su personalización no infringen derechos de terceros, incluyendo derechos de autor, marcas registradas o cualquier otro derecho de propiedad intelectual.'),
            ('p', 'Printirol actúa únicamente como proveedor del servicio de estampado y no asume responsabilidad alguna por el uso no autorizado de materiales proporcionados por el cliente. Ver descargo legal.'),
            ('h2', '9. Modificaciones'),
            ('p', 'Printirol podrá actualizar estos Términos y Condiciones en cualquier momento. Las modificaciones se publicarán en esta página y tendrán efecto inmediato.'),
            ('h2', 'Jurisdicción y ley aplicable'),
            ('p', 'Estos Términos se rigen por las leyes de la República Argentina. Para cualquier controversia, las partes se someten a los tribunales de Buenos Aires. Ver descargo legal.'),
            ('h2', 'Contacto'),
            ('p', 'Para consultas o reclamos:'),
            ('ul', ['Email: contacto@printirol.com', 'WhatsApp: +54 11 2391 9842']),
        ],
    },
    'privacidad.html': {
        'title': 'Política de privacidad',
        'updated': 'Última actualización: 2025',
        'blocks': [
            ('ul', ['Responsable del tratamiento: Tomás Maximiliano Palmieri Acosta',
                    'CUIT: 20-42672700-7',
                    'Domicilio: Buenos Aires, Argentina',
                    'Contacto: contacto@printirol.com']),
            ('h2', '1. Introducción'),
            ('p', 'En Printirol valoramos la privacidad y seguridad de los datos personales de nuestros usuarios. Esta Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos, procesamos y protegemos la información obtenida a través de nuestro sitio web, plataformas asociadas e integraciones externas.'),
            ('p', 'Al utilizar los servicios de Printirol, el usuario acepta las prácticas descritas a continuación.'),
            ('h2', '2. Datos personales que recopilamos'),
            ('p', 'Printirol recolecta los siguientes datos personales proporcionados voluntariamente por el usuario al utilizar nuestro sitio web, realizar compras, crear una cuenta o interactuar con nuestros productos y servicios:'),
            ('h3', '2.1 Datos de identificación'),
            ('ul', ['Nombre y apellido', 'Dirección de correo electrónico', 'Número de teléfono', 'Dirección de envío', 'DNI / CUIT',
                    'Cualquier otro dato que el usuario proporcione navegando en nuestra web',
                    'El usuario acepta los términos y condiciones al navegar de dentro de printirol.com, eso nos habilita a recolectar datos e información dentro de la platafomra.']),
            ('h3', '2.2 Datos de facturación y pagos'),
            ('p', 'Los pagos se procesan exclusivamente mediante Mercado Pago u otros procesadores externos.'),
            ('p', 'Printirol no almacena datos de tarjetas de crédito o débito.'),
            ('p', 'Únicamente podemos visualizar:'),
            ('ul', ['Email del comprador', 'Financiera emisora de la tarjeta (Visa, Mastercard, etc.)']),
            ('h3', '2.3 Archivos y contenido subido por el usuario'),
            ('p', 'El usuario puede subir imágenes, diseños u otros archivos para personalizar productos.'),
            ('ul', ['Los archivos subidos para la creación de productos se almacenan en nuestro servidor, bajo sus políticas globales de privacidad y seguridad.',
                    'Estos archivos permanecen almacenados de manera indefinida mientras el usuario mantenga su cuenta activa, salvo que solicite su eliminación.',
                    'Se encuentran encriptados para no divulgar información sobre el cliente.',
                    'Los archivos generados para producción (archivos “print-ready”) se almacenan temporalmente solo hasta la finalización del proceso productivo y luego son eliminados permanentemente.']),
            ('h3', '2.4 Datos de navegación y comportamiento'),
            ('p', 'Recolectamos automáticamente:'),
            ('ul', ['Cookies del sitio', 'Datos de navegación', 'Información del dispositivo', 'Carritos abandonados', 'Historial de compras',
                    'Datos de comportamiento dentro de la web', 'Direcciones IP', 'Información técnica necesaria para el funcionamiento del sitio']),
            ('h3', '2.5 Herramientas de análisis y marketing'),
            ('p', 'Utilizamos tecnologías de terceros como:'),
            ('ul', ['Google Analytics / Tag Manager', 'Meta Pixel (Facebook/Instagram Ads)', 'Cualquier otra herramienta que se considere útil']),
            ('p', 'Estas herramientas pueden recopilar datos anónimos o pseudonimizados sobre navegación, conversión y comportamiento para fines estadísticos o publicitarios.'),
            ('h2', '3. Finalidad del tratamiento de los datos'),
            ('p', 'Los datos recolectados se utilizan para:'),
            ('ul', ['Procesamiento de pedidos y personalización de productos', 'Facturación', 'Coordinación de envíos',
                    'Comunicación con el usuario (notificaciones, emails transaccionales)', 'Envío de newsletters (si el usuario lo aceptó expresamente)',
                    'Prevención de fraude y seguridad', 'Análisis estadísticos y de rendimiento', 'Publicidad personalizada en plataformas Meta y Google',
                    'Funcionamiento integral de integraciones']),
            ('h2', '4. Servicios externos utilizados'),
            ('p', 'Printirol utiliza servicios de terceros que pueden procesar datos personales:'),
            ('ul', ['Meta Ads (publicidad)', 'Google Analytics / Tag Manager (analítica y medición)', 'Mercado Pago (procesamiento de pagos)',
                    'Correo Argentino / OCA / Motomensajería (gestión de envíos)', 'Integración con Tienda Nube (ver sección 7)',
                    'Entre otros servicios externos de no publico conocimiento.']),
            ('p', 'Todos estos proveedores cuentan con sus propias políticas de privacidad y seguridad.'),
            ('h2', '5. Ubicación del almacenamiento de datos'),
            ('ul', ['Servidor principal: Servidores ubicados en Brasil', 'Cloudflare: infraestructura global distribuida',
                    'Backups internos: servidores seguros utilizados exclusivamente por Printirol']),
            ('h2', '6. Compartición de datos con terceros'),
            ('p', 'Printirol únicamente comparte datos con terceros cuando es necesario para la operación del servicio:'),
            ('ul', ['Empresas de envío: dirección, nombre y teléfono del destinatario', 'Pasarelas de pago: Mercado Pago maneja todos los datos financieros',
                    'Sistemas de analítica y publicidad: mediante identificadores anónimos',
                    'Integraciones técnicas (como Tienda Nube o WooCommerce) cuando corresponda']),
            ('p', 'No vendemos ni alquilamos datos personales bajo ninguna circunstancia.'),
            ('h2', '7. Integración con Tienda Nube'),
            ('p', 'Printirol cuenta con una integración técnica con Tienda Nube, mediante la cual podemos:'),
            ('ul', ['Crear, editar y sincronizar productos', 'Procesar pedidos provenientes de tiendas integradas', 'Recibir pedidos a nombre del administrador de la tienda']),
            ('h3', 'Tratamiento de datos en Tienda Nube'),
            ('p', 'Printirol no accede automáticamente a los datos personales del comprador final de las tiendas integradas.'),
            ('p', 'Cada usuario que desee comprar un producto debe completar sus datos directamente en Printirol, siendo Printirol el responsable del tratamiento de esos datos.'),
            ('p', 'Printirol actúa como:'),
            ('ul', ['Responsable de tratamiento de los datos ingresados en nuestro sitio', 'Procesador técnico de pedidos generados por tiendas externas']),
            ('p', 'No utilizamos estos datos para marketing propio, salvo autorización explícita del usuario.'),
            ('h2', '8. Derechos del usuario'),
            ('p', 'El usuario puede ejercer en cualquier momento los siguientes derechos:'),
            ('ul', ['Acceso a su información personal', 'Rectificación de datos inexactos', 'Eliminación de su cuenta y datos asociados',
                    'Restricción u oposición al tratamiento', 'Baja de comunicaciones comerciales', 'Solicitar copia de su información']),
            ('p', 'Para ejercer estos derechos, debe enviar un correo a: contacto@printirol.com'),
            ('h2', '9. Tiempos de conservación'),
            ('ul', ['Datos de cuenta: se conservan mientras el usuario mantenga su cuenta activa.',
                    'Archivos en servidor: se conservan mientras el usuario no solicite su eliminación.',
                    'Archivos para producción: se eliminan automáticamente tras completarse el proceso productivo.',
                    'Datos de pedidos: se conservan por los plazos legales correspondientes a obligaciones fiscales y comerciales.']),
            ('h2', '10. Cookies'),
            ('p', 'Printirol utiliza cookies esenciales, de análisis y de marketing.'),
            ('p', 'El usuario puede consultar el detalle completo en nuestra Política de Cookies, disponible en una página específica del sitio web.'),
            ('h2', '11. Seguridad'),
            ('p', 'Implementamos medidas técnicas y organizativas para proteger los datos, incluyendo:'),
            ('ul', ['Certificados SSL', 'Servidores seguros', 'Firewalls', 'Cifrado en tránsito', 'Protocolos internos de control de acceso']),
            ('p', 'Sin embargo, ningún sistema puede garantizar seguridad absoluta.'),
            ('h2', '12. Modificaciones'),
            ('p', 'Printirol podrá actualizar esta Política para reflejar cambios legales, tecnológicos o comerciales. La versión vigente será siempre la publicada en nuestro sitio web.'),
            ('h2', '13. Contacto'),
            ('p', 'Para consultas relacionadas con la privacidad de datos:'),
            ('ul', ['contacto@printirol.com', 'Buenos Aires, Argentina']),
        ],
    },
    'politica-de-envios.html': {
        'title': 'Política de envíos',
        'updated': 'Última actualización: 18/04/2026',
        'blocks': [
            ('p', 'En Printirol realizamos envíos con Correo Argentino, OCA y/o motomensajería, seleccionando la empresa según el destino para optimizar los tiempos de entrega en cada zona del país.'),
            ('h2', 'Tiempos de producción y envío'),
            ('p', 'El tiempo de producción de cada producto se detalla en la ficha del mismo al momento de la compra. Para productos textiles, en casos excepcionales, los plazos podrían extenderse hasta 2 o 3 días hábiles adicionales al estimado informado.'),
            ('p', 'El tiempo de envío es responsabilidad de la empresa de correo correspondiente y se estima, en general, entre 2 y 5 días hábiles según el destino. Estas fechas son orientativas y pueden variar por causas ajenas a Printirol.'),
            ('h2', 'Costos de envío'),
            ('p', 'El costo de envío varía según el tipo de producto, ya que no es lo mismo transportar una remera que un cuadro o una taza. Definimos tres categorías:'),
            ('table', [['Categoría', 'Costo', 'Productos incluidos'],
                       ['POD Liviano', '$7.900', 'Remeras, buzos, hoodies, tote bags y prendas textiles en general'],
                       ['POD Rígido', '$8.900', 'Tazas, gorras y accesorios rígidos'],
                       ['POD Frágil', '$9.900', 'Cuadros, láminas y productos de gran formato o delicados']]),
            ('p', 'Cada producto tiene su categoría de envío indicada en su ficha. El costo se calcula y abona automáticamente en el checkout junto al pedido.'),
            ('p', 'Podés ver el cuadro tarifario de envios en este link.'),
            ('p', 'Para pedidos que superen 1 kg, nos pondremos en contacto para coordinar el costo adicional antes del despacho.'),
            ('ul', ['Opción Mercado Libre: el envío a través de Mercado Libre está disponible exclusivamente para ventas realizadas dentro de esa plataforma, ya que Mercado Libre gestiona el cobro del envío y la generación de etiquetas de forma independiente.',
                    'En este caso, podés tildar la casilla “Envío Mercado libre” y adjuntar el pdf “etiqueta de envio” generada por ML']),
            ('h2', 'Características del envío'),
            ('p', 'Todos los productos de un mismo pedido se despachan juntos en un solo paquete. El cliente recibe un número de seguimiento para consultar el estado en el sitio de la empresa de correo correspondiente.'),
            ('p', 'Los paquetes se envían sin referencia a Printirol y se consignan a nombre del cliente o de la tienda del cliente, según lo indicado en la orden. Esto permite un servicio neutro apto para dropshipping y marca blanca.'),
            ('h2', 'Responsabilidad sobre la entrega'),
            ('p', 'El cliente es responsable de proporcionar una dirección correcta y completa. Si el pedido no puede ser entregado por dirección incorrecta, insuficiente o por no ser reclamado, el cliente deberá asumir el costo de un nuevo envío.'),
            ('p', 'Printirol no se responsabiliza por demoras, pérdidas o daños ocasionados por la empresa de correo, aunque nos comprometemos a colaborar en las gestiones necesarias para favorecer al cliente en el reclamo.'),
            ('h3', 'Roturas durante el envío'),
            ('p', 'Si el producto llega roto o dañado como consecuencia del transporte, asumimos la reimpresión sin costo adicional.'),
            ('p', 'Para gestionar el reclamo, el cliente debe contactarnos dentro de las 48 horas de recibido el producto (según fecha de entrega del tracking) y enviar:'),
            ('ul', ['Un video corto (5 a 10 segundos) mostrando el producto dañado desde distintos ángulos.',
                    'Una foto donde se vea el daño junto a un papel con la etiqueta de envio correspondiente al paquete recibido.']),
            ('p', 'Una vez verificado, iniciamos la reimpresión de inmediato. No es necesario devolver el producto.'),
            ('p', 'Esta política aplica únicamente a daños ocasionados durante el transporte. No cubre productos dañados por mal uso posterior a la recepción.'),
            ('h2', 'Consultas'),
            ('p', 'Para cualquier consulta relacionada con el envío, escribinos a: contacto@printirol.com'),
        ],
    },
    'cancelaciones.html': {
        'title': 'Cancelaciones y devoluciones',
        'updated': 'Última actualización: 18/04/2026',
        'blocks': [
            ('p', 'En Printirol trabajamos bajo el modelo de impresión bajo demanda, lo que significa que cada producto se fabrica exclusivamente a pedido y según las especificaciones del cliente. Por eso, nuestras políticas de cancelación y devolución están diseñadas para proteger el proceso y a todas las partes involucradas. Ver descargo legal.'),
            ('h2', 'Cancelaciones'),
            ('p', 'Una vez recibido el pago y aprobado el mockup (cuando corresponda), el pedido entra en producción de forma inmediata.'),
            ('p', 'Por este motivo, no se aceptan cancelaciones ni modificaciones del pedido, salvo:'),
            ('ul', ['Para cambiar la dirección de envío, si el producto no ha sido despachado aún.']),
            ('p', 'En ese caso, el cliente debe comunicarse de forma urgente a: contacto@printirol.com'),
            ('p', 'O por Whatsapp en la página de contacto'),
            ('h2', 'Devoluciones'),
            ('p', 'Printirol no acepta devoluciones por:'),
            ('ul', ['Cambio de opinión o arrepentimiento del comprador.', 'Error en el diseño aprobado por el cliente.',
                    'Cambio de talle o especificaciones ya confirmadas.']),
            ('p', 'Solo se aceptarán devoluciones en caso de:'),
            ('ul', ['Error de producción o estampado imputable a Printirol.', 'Fallas de fabricación o defectos evidentes.']),
            ('p', 'El cliente deberá:'),
            ('ul', ['Presentar el reclamo dentro de los 30 días corridos de recibido el producto.',
                    'Enviar fotos claras y detalle del problema al correo contacto@printirol.com.']),
            ('p', 'Recomendamos fervientemente que el consumidor final se comunique primero con la tienda o marca donde realizó la compra antes de iniciar cualquier proceso de devolución. Ver descargo legal.'),
            ('h2', 'Costos de devolución'),
            ('ul', ['Si el error es imputable a Printirol, el costo de la devolución y/o reenvío será cubierto por nosotros.',
                    'Si el error no es responsabilidad de Printirol, el costo del envío correrá por cuenta del cliente. Ver descargo legal.']),
            ('h2', 'Productos no aptos para devolución'),
            ('p', 'No se aceptarán devoluciones de productos que explícitamente indiquen en su ficha: “No se aceptan devoluciones de este producto”.'),
            ('h2', 'Consultas'),
            ('p', 'Para cualquier gestión o reclamo: contacto@printirol.com'),
        ],
    },
}

TEMPLATE = '''<!doctype html>
<html lang="es" class="no-js">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} | Printirol</title>
  <meta name="theme-color" content="#ffffff">
  <link rel="preload" as="image" href="media/logos/logo.png">
  <link rel="icon" type="image/png" href="img/icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
  <noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"></noscript>
  <link rel="stylesheet" href="css/styles.css?v={version}">
</head>
<body data-page="legal">
  <div id="site-header"></div>

  <main>
    <section class="section legal-section">
      <div class="container">
        <article class="legal">
          <h1>{title}</h1>
          <p class="legal-updated">{updated}</p>
          {body}
        </article>
      </div>
    </section>
  </main>

  <div id="site-footer"></div>

  <script src="js/main.js?v={version}"></script>
</body>
</html>
'''

for name, page in PAGES.items():
    (ROOT / name).write_text(TEMPLATE.format(
        title=page['title'], updated=page['updated'], version=VERSION, body=render(page['blocks'])))
    print('ok', name)
