import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:geolocator/geolocator.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  final MapController mapController = MapController();
  LatLng coords = LatLng(0, 0);

  initMap() async {
    try {
      // TODO: Request permission before accessing location
      // LocationPermission permission = await Geolocator.checkPermission();

      Position value = await Geolocator.getCurrentPosition();
      setState(() {
        mapController.move(
            LatLng(value.latitude, value.longitude), mapController.zoom);
        coords = LatLng(value.latitude, value.longitude);
      });
    } catch (e) {
      print(e.toString());
    }
  }

  @override
  void initState() {
    super.initState();
    initMap();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Home"),
        elevation: 0,
      ),
      body: FlutterMap(
        mapController: mapController,
        options: MapOptions(center: coords, zoom: 15.0),
        layers: [
          TileLayerOptions(
            urlTemplate: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            subdomains: ['a', 'b', 'c'],
          ),
          MarkerLayerOptions(
            markers: [
              Marker(
                  point: coords,
                  builder: (ctx) => const Icon(
                        Icons.circle_rounded,
                        color: Colors.lightBlue,
                      )),
            ],
          ),
        ],
      ),
    );
  }
}
