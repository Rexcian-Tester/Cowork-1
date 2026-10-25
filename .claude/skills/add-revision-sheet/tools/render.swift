import PDFKit
import AppKit
let a = CommandLine.arguments
let doc = PDFDocument(url: URL(fileURLWithPath: a[1]))!
let out = a[2]; let W = CGFloat(Double(a[3]) ?? 1600)
print("pages", doc.pageCount)
for i in 0..<doc.pageCount {
  let p = doc.page(at: i)!
  let r = p.bounds(for: .mediaBox)
  let s = W / r.width
  let w = Int(r.width*s), h = Int(r.height*s)
  let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: w, pixelsHigh: h, bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
  NSGraphicsContext.saveGraphicsState()
  let ctx = NSGraphicsContext(bitmapImageRep: rep)!
  NSGraphicsContext.current = ctx
  ctx.cgContext.setFillColor(NSColor.white.cgColor); ctx.cgContext.fill(CGRect(x:0,y:0,width:w,height:h))
  ctx.cgContext.scaleBy(x: s, y: s)
  p.draw(with: .mediaBox, to: ctx.cgContext)
  NSGraphicsContext.restoreGraphicsState()
  let d = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.85])!
  try! d.write(to: URL(fileURLWithPath: String(format: "%@/p%02d.jpg", out, i+1)))
  print(i+1, w, h)
}
