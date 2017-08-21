/* Create database */
CREATE DATABASE IF NOT EXISTS kickcommerce_crosswater;

/* Create user */
GRANT usage ON *.* to 'kickcomm_cw_rw'@'%' identified by 'NhSeRcAA';

/* Give user permissions for the database  */
GRANT all privileges ON kickcommerce_crosswater.* to 'kickcomm_cw_rw'@'%';
