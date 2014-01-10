-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-01-2014 a las 13:19:04
-- Versión del servidor: 5.5.32
-- Versión de PHP: 5.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `carritocompra`
--
CREATE DATABASE IF NOT EXISTS `carritocompra` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `carritocompra`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autores`
--

CREATE TABLE IF NOT EXISTS `autores` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `AUTOR` text,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Volcado de datos para la tabla `autores`
--

INSERT INTO `autores` (`ID`, `AUTOR`) VALUES
(2, 'Julio Verne'),
(3, 'Alonso y Finn'),
(4, 'Vargas Llosa'),
(5, 'Pérez Reverte'),
(6, 'Victor Hugo'),
(8, 'Ken Follet'),
(10, 'Leon Uris'),
(16, 'Frederick Forsyth'),
(17, 'Julia Navarro'),
(18, 'Carmen Posadas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `editorial`
--

CREATE TABLE IF NOT EXISTS `editorial` (
  `EID` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE` text,
  PRIMARY KEY (`EID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Volcado de datos para la tabla `editorial`
--

INSERT INTO `editorial` (`EID`, `NOMBRE`) VALUES
(1, 'Bruguera'),
(2, 'Planeta'),
(3, 'reverte'),
(4, 'la nueva'),
(5, 'anaya'),
(6, 'mac graw'),
(7, 'santillana'),
(8, 'alfaguara'),
(9, 'Del castillo'),
(10, 'Vives');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `idioma`
--

CREATE TABLE IF NOT EXISTS `idioma` (
  `LID` int(11) NOT NULL AUTO_INCREMENT,
  `IDIOMA` text,
  PRIMARY KEY (`LID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Volcado de datos para la tabla `idioma`
--

INSERT INTO `idioma` (`LID`, `IDIOMA`) VALUES
(1, 'Español'),
(2, 'Inglés'),
(3, 'frances'),
(4, 'chino'),
(5, 'japones'),
(6, 'bulgaro'),
(7, 'arabe'),
(10, 'mandarin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE IF NOT EXISTS `libros` (
  `TID` int(11) NOT NULL AUTO_INCREMENT,
  `ID` int(11) NOT NULL,
  `LID` int(11) NOT NULL,
  `EID` int(11) NOT NULL,
  `TITULO` text,
  `PRECIO` double NOT NULL,
  PRIMARY KEY (`TID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=36 ;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`TID`, `ID`, `LID`, `EID`, `TITULO`, `PRECIO`) VALUES
(1, 2, 1, 1, 'Viaje al Centro de la Tierra', 13),
(2, 3, 1, 1, 'Mecánica', 15),
(3, 2, 1, 2, 'La vuelta al mundo en 80 días', 14),
(4, 2, 1, 2, '20.000 leguas de viaje submarino', 15),
(5, 2, 1, 3, 'Los hijos del capitan Grant', 15),
(6, 2, 1, 1, 'Campos y Ondas', 18),
(7, 5, 1, 6, 'Capitan Alatriste', 17),
(8, 8, 1, 1, 'Triple', 26),
(9, 5, 1, 6, 'El maestro de esgrima', 19),
(10, 10, 1, 6, 'exodo', 25),
(11, 5, 1, 5, 'Teritorio Comanche', 22),
(12, 5, 1, 2, 'La reina del sur', 26),
(13, 6, 1, 1, 'Los Miserables', 29),
(14, 6, 1, 1, 'El jorobado de Notre Dame', 30),
(15, 8, 1, 1, 'La isla de las tormentas', 33),
(16, 8, 1, 1, 'Los pilares de la tierra', 34),
(17, 4, 1, 2, 'La ciudad y los perros', 30),
(18, 4, 1, 2, 'Pantaleon y las visitadoras', 31),
(19, 4, 1, 2, 'La tia Julia y el escribidor', 32),
(20, 10, 1, 3, 'QB VII', 38),
(21, 10, 1, 8, 'Mila 18', 34),
(22, 6, 1, 1, 'Nuestra Señora de Paris', 38),
(23, 16, 1, 2, 'Chacal', 28),
(24, 16, 1, 2, 'Odessa', 29),
(25, 16, 1, 2, 'El Afgano', 30),
(26, 17, 1, 3, 'La hermandad de la sabana santa', 31),
(27, 17, 1, 3, 'La biblia de barro', 32),
(28, 17, 1, 3, 'La sangre de los inocentes', 33),
(29, 18, 1, 3, 'El testigo invisible', 35),
(30, 18, 1, 4, 'La cinta roja', 35),
(31, 18, 1, 4, 'Invitación a un asesinato', 36),
(32, 8, 2, 4, 'The Key to Rebecca', 28),
(33, 8, 2, 4, 'The Man from St. Petersburg', 29),
(34, 8, 4, 2, 'The Third Twin', 34),
(35, 8, 4, 2, 'A Place Called Freedom', 35);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
