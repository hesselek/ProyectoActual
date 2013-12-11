-- phpMyAdmin SQL Dump
-- version 4.0.4.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-11-2013 a las 14:56:30
-- Versión del servidor: 5.5.32
-- Versión de PHP: 5.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `db_liga`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultados`
--

CREATE TABLE IF NOT EXISTS `resultados` (
  `liga` varchar(40) NOT NULL,
  `equipoLocal` varchar(40) NOT NULL,
  `equipoVisitante` varchar(40) NOT NULL,
  `golesLocal` tinyint(4) NOT NULL,
  `golesVisitante` tinyint(4) NOT NULL,
  PRIMARY KEY (`liga`,`equipoLocal`,`equipoVisitante`),
  KEY `liga` (`liga`,`equipoLocal`,`equipoVisitante`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `resultados`
--

INSERT INTO `resultados` (`liga`, `equipoLocal`, `equipoVisitante`, `golesLocal`, `golesVisitante`) VALUES
('primera', 'el_mejor', 'el_madrid', 0, 0),
('quitancreo', 'cinco', 'cuatro', 2, 2),
('quitancreo', 'cinco', 'diez', 2, 3),
('quitancreo', 'cinco', 'doce', 3, 3),
('quitancreo', 'cinco', 'dos', 1, 1),
('quitancreo', 'cinco', 'nueve', 2, 2),
('quitancreo', 'cinco', 'ocho', 2, 2),
('quitancreo', 'cinco', 'once', 2, 2),
('quitancreo', 'cinco', 'seis', 2, 2),
('quitancreo', 'cinco', 'siete', 2, 2),
('quitancreo', 'cinco', 'tres', 2, 2),
('quitancreo', 'cinco', 'uno', 2, 2),
('quitancreo', 'diez', 'cinco', 2, 2);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `resultados`
--
ALTER TABLE `resultados`
  ADD CONSTRAINT `resultados_ibfk_1` FOREIGN KEY (`liga`) REFERENCES `ligas` (`nombre`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
