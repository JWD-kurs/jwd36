package jwd.wafepa.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import jwd.wafepa.model.Record;
import jwd.wafepa.repository.RecordRepository;
import jwd.wafepa.service.RecordService;

@Service
public class JpaRecordService implements RecordService {

	@Autowired
	private RecordRepository recordRepository;
	
	@Override
	public Record findOne(Long id) {
		return recordRepository.findOne(id);
	}

	@Override
	public Page<Record> findAll(int pageNum) {
		return recordRepository.findAll(new PageRequest(pageNum, 5));
	}

	@Override
	public Record save(Record record) {
		return recordRepository.save(record);
	}

	@Override
	public Record delete(Long id) {
		Record record = recordRepository.findOne(id);
		if(record != null){
			recordRepository.delete(record);
		}
		
		return record;
	}

	@Override
	public Page<Record> findByUserId(Long id, int pageNum) {
		return recordRepository.findByUserId(id, new PageRequest(pageNum, 5));
	}
	
}
