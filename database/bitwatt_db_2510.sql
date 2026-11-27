CREATE DATABASE  IF NOT EXISTS `bitwatt_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bitwatt_db`;
-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bitwatt_db
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `circuitos_electricos`
--

DROP TABLE IF EXISTS `circuitos_electricos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `circuitos_electricos` (
  `id_circuito` int NOT NULL AUTO_INCREMENT,
  `id_zona` int NOT NULL,
  `codigo_circuito` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `voltaje_nominal` decimal(5,2) DEFAULT '120.00',
  `amperaje_maximo` decimal(5,2) NOT NULL,
  PRIMARY KEY (`id_circuito`),
  UNIQUE KEY `codigo_circuito` (`codigo_circuito`),
  KEY `fk_circuitos_zona` (`id_zona`),
  CONSTRAINT `fk_circuitos_zona` FOREIGN KEY (`id_zona`) REFERENCES `zonas` (`id_zona`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `circuitos_electricos`
--

LOCK TABLES `circuitos_electricos` WRITE;
/*!40000 ALTER TABLE `circuitos_electricos` DISABLE KEYS */;
/*!40000 ALTER TABLE `circuitos_electricos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `edificios`
--

DROP TABLE IF EXISTS `edificios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `edificios` (
  `id_edificio` int NOT NULL AUTO_INCREMENT,
  `nombre_edificio` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` text COLLATE utf8mb4_unicode_ci,
  `superficie_m2` decimal(10,2) DEFAULT NULL,
  `tipo_inmueble` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_edificio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `edificios`
--

LOCK TABLES `edificios` WRITE;
/*!40000 ALTER TABLE `edificios` DISABLE KEYS */;
/*!40000 ALTER TABLE `edificios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipos_electricos`
--

DROP TABLE IF EXISTS `equipos_electricos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipos_electricos` (
  `id_equipo` bigint NOT NULL AUTO_INCREMENT,
  `id_zona` int NOT NULL,
  `id_tipo_equipo` int NOT NULL,
  `nombre_equipo` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `potencia_nominal_w` decimal(8,2) NOT NULL,
  `es_consumo_critico` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_equipo`),
  KEY `fk_equipos_zona` (`id_zona`),
  KEY `fk_equipos_tipo` (`id_tipo_equipo`),
  CONSTRAINT `fk_equipos_tipo` FOREIGN KEY (`id_tipo_equipo`) REFERENCES `tipos_equipo` (`id_tipo_equipo`) ON DELETE CASCADE,
  CONSTRAINT `fk_equipos_zona` FOREIGN KEY (`id_zona`) REFERENCES `zonas` (`id_zona`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipos_electricos`
--

LOCK TABLES `equipos_electricos` WRITE;
/*!40000 ALTER TABLE `equipos_electricos` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipos_electricos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nodos_esp32`
--

DROP TABLE IF EXISTS `nodos_esp32`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nodos_esp32` (
  `id_nodo` int NOT NULL AUTO_INCREMENT,
  `mac_address` varchar(17) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ip_local` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `firmware_version` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado_nodo` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT 'online',
  `ultima_conexion` datetime DEFAULT NULL,
  PRIMARY KEY (`id_nodo`),
  UNIQUE KEY `mac_address` (`mac_address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nodos_esp32`
--

LOCK TABLES `nodos_esp32` WRITE;
/*!40000 ALTER TABLE `nodos_esp32` DISABLE KEYS */;
/*!40000 ALTER TABLE `nodos_esp32` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pisos`
--

DROP TABLE IF EXISTS `pisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pisos` (
  `id_piso` int NOT NULL AUTO_INCREMENT,
  `id_edificio` int NOT NULL,
  `numero_piso` int NOT NULL,
  `nombre_piso` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_piso`),
  KEY `fk_pisos_edificio` (`id_edificio`),
  CONSTRAINT `fk_pisos_edificio` FOREIGN KEY (`id_edificio`) REFERENCES `edificios` (`id_edificio`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pisos`
--

LOCK TABLES `pisos` WRITE;
/*!40000 ALTER TABLE `pisos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id_rol`),
  UNIQUE KEY `nombre_rol` (`nombre_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensores_corriente`
--

DROP TABLE IF EXISTS `sensores_corriente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensores_corriente` (
  `id_sensor` int NOT NULL AUTO_INCREMENT,
  `id_nodo` int NOT NULL,
  `id_circuito` int NOT NULL,
  `modelo_sensor` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `factor_calibracion` decimal(8,4) DEFAULT '1.0000',
  PRIMARY KEY (`id_sensor`),
  KEY `fk_sensores_nodo` (`id_nodo`),
  KEY `fk_sensores_circuito` (`id_circuito`),
  CONSTRAINT `fk_sensores_circuito` FOREIGN KEY (`id_circuito`) REFERENCES `circuitos_electricos` (`id_circuito`) ON DELETE CASCADE,
  CONSTRAINT `fk_sensores_nodo` FOREIGN KEY (`id_nodo`) REFERENCES `nodos_esp32` (`id_nodo`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensores_corriente`
--

LOCK TABLES `sensores_corriente` WRITE;
/*!40000 ALTER TABLE `sensores_corriente` DISABLE KEYS */;
/*!40000 ALTER TABLE `sensores_corriente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_equipo`
--

DROP TABLE IF EXISTS `tipos_equipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_equipo` (
  `id_tipo_equipo` int NOT NULL AUTO_INCREMENT,
  `categoria` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id_tipo_equipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_equipo`
--

LOCK TABLES `tipos_equipo` WRITE;
/*!40000 ALTER TABLE `tipos_equipo` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipos_equipo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_roles`
--

DROP TABLE IF EXISTS `usuario_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_roles` (
  `id_usuario_rol` bigint NOT NULL AUTO_INCREMENT,
  `id_usuario` bigint NOT NULL,
  `id_rol` int NOT NULL,
  `fecha_asignacion` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario_rol`),
  KEY `fk_useroles_usuario` (`id_usuario`),
  KEY `fk_useroles_rol` (`id_rol`),
  CONSTRAINT `fk_useroles_rol` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE CASCADE,
  CONSTRAINT `fk_useroles_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_roles`
--

LOCK TABLES `usuario_roles` WRITE;
/*!40000 ALTER TABLE `usuario_roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` bigint NOT NULL AUTO_INCREMENT,
  `nombre_completo` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT 'activo',
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zonas`
--

DROP TABLE IF EXISTS `zonas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zonas` (
  `id_zona` int NOT NULL AUTO_INCREMENT,
  `id_piso` int NOT NULL,
  `nombre_zona` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `capacidad_personas` int DEFAULT NULL,
  PRIMARY KEY (`id_zona`),
  KEY `fk_zonas_piso` (`id_piso`),
  CONSTRAINT `fk_zonas_piso` FOREIGN KEY (`id_piso`) REFERENCES `pisos` (`id_piso`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zonas`
--

LOCK TABLES `zonas` WRITE;
/*!40000 ALTER TABLE `zonas` DISABLE KEYS */;
/*!40000 ALTER TABLE `zonas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'bitwatt_db'
--

--
-- Dumping routines for database 'bitwatt_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-18 21:09:07
