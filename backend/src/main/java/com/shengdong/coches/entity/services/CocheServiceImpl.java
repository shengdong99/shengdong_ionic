package com.shengdong.coches.entity.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shengdong.coches.entity.dao.ICocheDao;
import com.shengdong.coches.entity.models.Coche;

@Service
public class CocheServiceImpl implements ICocheService{
	
	@Autowired
	private ICocheDao cocheDao;
	
	@Override
	public Coche get(long id) {
		return cocheDao.findById(id).get();
	}

	@Override
	public List<Coche> getAll() {
		return (List<Coche>) cocheDao.findAll();
	}

	@Override
	public void post(Coche coche) {
		cocheDao.save(coche);
		
	}

	@Override
	public void put(Coche coche, long id) {
		cocheDao.findById(id).ifPresent((x)->{
				coche.setId(id);
				cocheDao.save(coche);
		});
	}

	@Override
	public void delete(long id) {
		cocheDao.deleteById(id);
	}

}
