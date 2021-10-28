package com.shengdong.coches.entity.dao;

import org.springframework.data.repository.CrudRepository;

import com.shengdong.coches.entity.models.Coche;

public interface ICocheDao extends CrudRepository<Coche, Long>{

}
