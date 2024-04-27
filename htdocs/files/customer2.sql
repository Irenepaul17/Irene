-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 13, 2024 at 02:45 AM
-- Server version: 5.7.30
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `322`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer2`
--

CREATE TABLE `customer2` (
  `CustomerID` int(4) NOT NULL,
  `Surname` varchar(20) NOT NULL,
  `Givenname` varchar(20) NOT NULL,
  `City` varchar(20) NOT NULL,
  `Phone` varchar(10) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `type` varchar(20) NOT NULL,
  `outstanding` int(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer2`
--

INSERT INTO `customer2` (`CustomerID`, `Surname`, `Givenname`, `City`, `Phone`, `Email`, `type`, `outstanding`) VALUES
(1001, 'Harris-Harrison', 'Anthony', 'Auckland', '074567760', 'ha@xyz.com', 'online', 0),
(1002, 'Tohu', 'Hone', 'Auckland', '093426574', 'hon@xyz.com', 'inperson', 0),
(1003, 'Pollock', 'Steve', 'Hamilton', '073450909', 'ps@xyz.com', '', 0),
(1004, 'Henare', 'Jessie', 'Hamilton', '072343563', 'jg@xyz.com', '', 20),
(1005, 'Robinson', 'Hemi', 'Nelson', '09347822', 'rd@xyz.com', '', 0),
(1006, 'Spiller', 'Justina', 'Wellington', '078901225', 'sj@xyz.com', '', 0),
(1007, 'Johnson', 'Wiremu', 'Christchurch', '0254441111', 'wire@mail.com', 'Inperson', 0),
(1008, 'Patel', 'Karim', 'Dunedin', '0213633333', 'kp@gmail.com', 'online', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer2`
--
ALTER TABLE `customer2`
  ADD PRIMARY KEY (`CustomerID`);
