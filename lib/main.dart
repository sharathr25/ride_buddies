import 'package:flutter/material.dart';
import 'package:ride_buddies/constants/style.dart';
import 'package:ride_buddies/screens/home.dart';

void main() {
  runApp(
    MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Ride Buddies',
      theme: ThemeData(
        primaryColor: primaryColor,
        backgroundColor: bgColor,
        appBarTheme: const AppBarTheme(backgroundColor: primaryColor),
      ),
      home: const Home(),
    ),
  );
}
