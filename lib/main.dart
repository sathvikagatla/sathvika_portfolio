import 'dart:ui_web' as ui_web;

import 'package:flutter/material.dart';
import 'package:web/web.dart' as web;

void main() {
  ui_web.platformViewRegistry.registerViewFactory(
    'sathvika-portfolio-frame',
    (int viewId) {
      final frame = web.HTMLIFrameElement()
        ..src = 'portfolio.html'
        ..title = 'Gatla Sathvika Portfolio'
        ..style.border = '0'
        ..style.width = '100%'
        ..style.height = '100%'
        ..style.display = 'block';
      return frame;
    },
  );

  runApp(const SathvikaPortfolioApp());
}

class SathvikaPortfolioApp extends StatelessWidget {
  const SathvikaPortfolioApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'My Portfolio · Gatla Sathvika',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFFFF765F)),
        useMaterial3: true,
      ),
      home: const Scaffold(
        body: SizedBox.expand(
          child: HtmlElementView(viewType: 'sathvika-portfolio-frame'),
        ),
      ),
    );
  }
}
