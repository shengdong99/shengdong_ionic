package com.shengdong.coches.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shengdong.coches.entity.models.Coche;
import com.shengdong.coches.entity.services.ICocheService;

@CrossOrigin(origins = "http://localhost:8100")
@RestController
public class CocheController {
	
	@Autowired
	ICocheService cocheService;
	
	@GetMapping("/coche")
	public List<Coche> getAllCoches(){
		return cocheService.getAll();
	}
	
	@GetMapping("/coche/{id}")
	public Coche getOne(@PathVariable(value = "id") long id) {
		return cocheService.get(id);
	}
	
	@PostMapping("/coche")
	public void add(Coche coche) {
		cocheService.post(coche);
	}
	
	@PutMapping("/coche/{id}")
	public void update(Coche coche, @PathVariable(value= "id") long id) {
		cocheService.put(coche, id);
	}
	
	@DeleteMapping("/coche/{id}")
	public void update(@PathVariable(value= "id") long id) {
		cocheService.delete(id);
	}
}

