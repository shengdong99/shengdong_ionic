package com.shengdong.coches.entity.services;

import java.util.List;

import com.shengdong.coches.entity.models.Coche;

public interface ICocheService {
	public Coche get(long id);
	public List<Coche> getAll();
	public void post(Coche coche);
	public void put(Coche coche, long id);
	public void delete(long id);

}
