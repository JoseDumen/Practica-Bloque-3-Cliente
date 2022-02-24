-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 10, 2022 at 08:40 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `potter`
--
CREATE DATABASE IF NOT EXISTS `potter` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `potter`;

-- --------------------------------------------------------

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
CREATE TABLE `cliente` (
  `dni` varchar(9) NOT NULL,
  `correo` varchar(30) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `direccion` varchar(30) NOT NULL,
  `tipoSuscripcion` tinyint(1) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cliente`
--

INSERT INTO `cliente` (`dni`, `correo`, `nombre`, `direccion`, `tipoSuscripcion`, `password`) VALUES
('00000000A', 'admin@hotmail.com', 'admin Rodríguez', 'calle La Parra 0', 1, 'admin000'),
('11111111B', 'cliente1@hotmail.com', 'Cliente1', 'calle La Parra 1', 0, 'kakakaka'),
('22222222C', 'cliente2@hotmail.com', 'Cliente2', 'calle La Parra 2', 1, 'kakakaka'),
('33333333D', 'cliente3@hotmail.com', 'Cliente3', 'calle La Parra 3', 1, 'kakakaka'),
('44444444E', 'cliente4@hotmail.com', 'Cliente4', 'calle La Parra 4', 0, 'kakakaka');

-- --------------------------------------------------------

--
-- Table structure for table `linea`
--

DROP TABLE IF EXISTS `linea`;
CREATE TABLE `linea` (
  `idLinea` int(20) NOT NULL,
  `idPedido` int(20) NOT NULL,
  `idProducto` varchar(20) NOT NULL,
  `cantidad` int(4) NOT NULL,
  `precioUnitario` float(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
CREATE TABLE `pedido` (
  `idPedido` int(20) NOT NULL,
  `idCliente` varchar(9) NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto` (
  `idProducto` varchar(20) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `precio` float(6,2) NOT NULL,
  `stock` int(6) NOT NULL,
  `tipo` varchar(1) NOT NULL COMMENT 'Posibles valores: V/M',
  `propietario` varchar(20) DEFAULT NULL,
  `material` varchar(20) DEFAULT NULL,
  `personaje` varchar(20) DEFAULT NULL,
  `tipoMuneco` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `producto`
--

INSERT INTO `producto` (`idProducto`, `nombre`, `precio`, `stock`, `tipo`, `propietario`, `material`, `personaje`, `tipoMuneco`) VALUES
('munecoAragog', 'Muñeco de Aragog', 9.99, 15, 'M', NULL, NULL, 'Aragog', 'Peluche'),
('munecoBasilisco', 'Muñeco de Basilisco', 9.99, 11, 'M', NULL, NULL, 'Basilisco', 'Peluche'),
('munecoCrookshanks', 'Muñeco de Crookshanks', 9.99, 16, 'M', NULL, NULL, 'Crookshanks', 'Peluche'),
('munecoDobby', 'Muñeco de Dobby', 11.99, 8, 'M', NULL, NULL, 'Dobby', 'Peluche'),
('munecoDumbledore', 'Muñeco de Albus Dumbledore', 15.99, 9, 'M', NULL, NULL, 'Albus Dumbledore', 'Muñeco'),
('munecoFawkes', 'Muñeco de Fawkes', 9.99, 9, 'M', NULL, NULL, 'Fawks', 'Peluche'),
('munecoGranger', 'Muñeco de Hermione Granger', 14.99, 8, 'M', NULL, NULL, 'Hermione Granger', 'Muñeco'),
('munecoHagrid', 'Muñeco de Rubeus Hagrid', 14.99, 10, 'M', NULL, NULL, 'Rubeus Hagrid', 'Muñeco'),
('munecoHedwig', 'Muñeco de Hedwig', 11.99, 12, 'M', NULL, NULL, 'Hedwig', 'Peluche'),
('munecoMalfoy', 'Muñeco de Draco Malfoy', 14.99, 11, 'M', NULL, NULL, 'Draco Malfoy', 'Muñeco'),
('munecoPotter', 'Muñeco de Harry Potter', 15.99, 7, 'M', NULL, NULL, 'Harry Potter', 'Muñeco'),
('munecoRyddle', 'Muñeco de Tom Ryddle', 14.99, 10, 'M', NULL, NULL, 'Tom Ryddle', 'Muñeco'),
('munecoWeasley', 'Muñeco de Ron Weasley', 14.99, 8, 'M', NULL, NULL, 'Ron Weasley', 'Muñeco'),
('varitaBlack', 'Varita de Sirius Black', 19.99, 3, 'V', 'Sirius Black', 'Roble', NULL, NULL),
('varitaDumbledore', 'Varita de Albus Dumbledore', 24.99, 1, 'V', 'Albus Dumbledore', 'Sauco', NULL, NULL),
('varitaGranger', 'Varita de Hermione Granger', 19.99, 3, 'V', 'Hermione Granger', 'Vid', NULL, NULL),
('varitaLestrange', 'Varita de Bellatrix Lestrange', 19.99, 5, 'V', 'Bellatrix Lestrange', 'Nogal', NULL, NULL),
('varitaMalfoy', 'Varita de Draco Malfoy', 19.99, 4, 'V', 'Draco Malfoy', 'Espino', NULL, NULL),
('varitaMcGonagall', 'Varita de Minerva McGonagall', 19.99, 5, 'V', 'Minerva McGonagal', 'Abeto', NULL, NULL),
('varitaPotter', 'Varita de Harry Potter', 24.99, 2, 'V', 'Harry Potter', 'Acebo', NULL, NULL),
('varitaRyddle', 'Varita de Tom Ryddle', 24.99, 2, 'V', 'Tom Ryddle', 'Tejo', NULL, NULL),
('varitaWeasley', 'Varita de Ron Weasley', 19.99, 2, 'V', 'Ron Weasley', 'Fresno', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`dni`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Indexes for table `linea`
--
ALTER TABLE `linea`
  ADD PRIMARY KEY (`idLinea`),
  ADD KEY `fk_idpedido` (`idPedido`),
  ADD KEY `fk_idproducto` (`idProducto`);

--
-- Indexes for table `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`idPedido`),
  ADD KEY `idCliente` (`idCliente`);

--
-- Indexes for table `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idProducto`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `linea`
--
ALTER TABLE `linea`
  MODIFY `idLinea` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pedido`
--
ALTER TABLE `pedido`
  MODIFY `idPedido` int(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `linea`
--
ALTER TABLE `linea`
  ADD CONSTRAINT `fk_idpedido` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`),
  ADD CONSTRAINT `fk_idproducto` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`);

--
-- Constraints for table `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`dni`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
