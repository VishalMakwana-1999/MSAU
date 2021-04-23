package com.msau.onboard.dao;

import com.msau.onboard.entity.MSManager;
import com.msau.onboard.entity.OnBoardee;
import com.msau.onboard.entity.Skill;
import com.msau.onboard.entity.Skills;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class OnBoardeeImpl implements OnBoardeeRepository{

    private static final String SELECT_EVERY_ROW="Select * from onboardee as o,msmanager as m where o.managerId=m.managerId";
    private static final String str="Select * from onboardee as o LEFT JOIN msmanager as m on o.managerId=m.managerId Left join onboardskill as os on o.demandId=os.demandId where o.active=1 ";
    private static final String SELECT_BY_ID="Select * from onboardee as o LEFT JOIN msmanager as m on o.managerId=m.managerId Left join onboardskill as os on o.demandId=os.demandId and o.demandId=";
    private static final String DELETE_BY_ID="UPDATE onboardee set active=0 where demandId=?";
    private static final String FETCH_MANAGERS="SELECT * from msmanager";
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Override
    public HashMap<String,Object> saveOnBoardee(OnBoardee onBoardee) {
        int already_exist=0;
        already_exist=jdbcTemplate.queryForObject("SELECT Count(*) as exist from onboardee where email='"+onBoardee.getEmail()+"'", new RowMapper<Integer>() {
            @Override
            public Integer mapRow(ResultSet resultSet, int i) throws SQLException {
                return resultSet.getInt("exist");
            }
        });
        if (already_exist>0){
            HashMap<String,Object> map=new HashMap<>();
            map.put("Status",204);
            map.put("Message","Email already exists");
            return map;
        }
        jdbcTemplate.update("INSERT into onboardee (fname,lname,startDate,bgcStatus,managerId,location,etaCompletion,email,dob,onBoardStatus,phone)" +
               "VALUES (?,?,?,?,?,?,?,?,?,?,?)",onBoardee.getFname(),onBoardee.getLname(),onBoardee.getStartDate(),onBoardee.getBgcStatus(),onBoardee.getManagerId()
        ,onBoardee.getLocation(),onBoardee.getEtaCompletion(),onBoardee.getEmail(),onBoardee.getDob(),onBoardee.getOnboardStatus(),onBoardee.getPhone());
        List<Skill> skillList=onBoardee.getSkills().getSkillList();
        int rown=0;
        rown=jdbcTemplate.queryForObject("SELECT MAX(demandId) as demandId from onboardee", new RowMapper<Integer>() {
            @Override
            public Integer mapRow(ResultSet rs, int i) throws SQLException {
                return rs.getInt("demandId");
            }
        });
        for(int i=0;i<skillList.size();i++){
            Skill s= skillList.get(i);
            jdbcTemplate.update("INSERT into onboardskill (demandId,skillName,level) VALUES (?,?,?)",rown,s.getSkillName(),s.getLevel());
        }
        HashMap<String,Object> map=new HashMap();
        map.put("Status",200);
        map.put("Message","Onboardee Added");
        return map;
    }

    @Override
    public OnBoardee updateOnBoardee(OnBoardee onBoardee) {
        return onBoardee;
    }

    @Override
    public OnBoardee getOnBoardeebyId(int DemandId) {

        return jdbcTemplate.query(SELECT_BY_ID+Integer.toString(DemandId),new ResultSetExtractor<OnBoardee>(){

            @Override
            public OnBoardee extractData(ResultSet rs) throws SQLException, DataAccessException {
                Map<Integer, OnBoardee> onboardeeKeyOnboardeeMap = new HashMap<Integer, OnBoardee>();
                Map<Integer, Skill> skillKeyskillMap = new HashMap<Integer, Skill>();
                while (rs.next()) {

                    Integer onboardeeKey = rs.getInt("demandId");
                    OnBoardee onBoardee = onboardeeKeyOnboardeeMap.get(onboardeeKey);
                    if (onBoardee == null) {
                        onBoardee = new OnBoardee();
                        onBoardee.setDemandId(onboardeeKey);
                        onBoardee.setFname(rs.getString("fname"));
                        onBoardee.setLname(rs.getString("lname"));
                        onBoardee.setStartDate(rs.getString("startDate"));
                        onBoardee.setBgcStatus(rs.getString("bgcStatus"));
                        onBoardee.setManagerId(rs.getInt("managerId"));
                        onBoardee.setManager(new MSManager(rs.getInt("managerId"), rs.getString("managerFName"), rs.getString("managerLName")));
                        onBoardee.setLocation(rs.getString("location"));
                        onBoardee.setEtaCompletion(rs.getString("etaCompletion"));
                        onBoardee.setEmail(rs.getString("email"));
                        onBoardee.setDob(rs.getString("dob"));
                        onBoardee.setOnboardStatus(rs.getString("onboardStatus"));
                        onBoardee.setPhone(rs.getString("phone"));
                    }
                    Integer id = rs.getInt("id");
                    Skill skill = skillKeyskillMap.get(id);
                    if (skill == null) {
                        skill = new Skill();
                        if (onBoardee.getSkills() == null)
                            onBoardee.setSkills(new Skills());
                        if (onBoardee.getSkills().getSkillList() == null)
                            onBoardee.getSkills().setSkillList(new ArrayList<Skill>());

                        onBoardee.getSkills().getSkillList().add(skill);
                        skillKeyskillMap.put(id, skill);
                        skill.setId(rs.getInt("id"));
                        skill.setSkillName(rs.getString("skillName"));
                        skill.setDemandId(rs.getInt("demandId"));
                        skill.setLevel(rs.getString("level"));
                    }
                    onboardeeKeyOnboardeeMap.put(onboardeeKey,onBoardee);
                }
                return onboardeeKeyOnboardeeMap.get(DemandId);
            }
        });
    }

    @Override
    public List<OnBoardee> getOnBoardees(String name) {

        String q=str+"and o.fname like '%"+name+"%' or o.lname like '%"+name+"%'";
        return jdbcTemplate.query(q, new ResultSetExtractor<List<OnBoardee> >() {
            @Override
            public List<OnBoardee> extractData(ResultSet rs) throws SQLException, DataAccessException {

                List<OnBoardee> list = new ArrayList<>();
                Map<Integer, OnBoardee> onboardeeKeyOnboardeeMap = new HashMap<Integer, OnBoardee>();
                Map<Integer, Skill> skillKeyskillMap = new HashMap<Integer, Skill>();
                while (rs.next()) {

                    Integer onboardeeKey = rs.getInt("demandId");
                    OnBoardee onBoardee = onboardeeKeyOnboardeeMap.get(onboardeeKey);
                    if (onBoardee == null) {
                        onBoardee = new OnBoardee();
                        list.add(onBoardee);
                        onBoardee.setDemandId(onboardeeKey);
                        onBoardee.setFname(rs.getString("fname"));
                        onBoardee.setLname(rs.getString("lname"));
                        onBoardee.setStartDate(rs.getString("startDate"));
                        onBoardee.setBgcStatus(rs.getString("bgcStatus"));
                        onBoardee.setManagerId(rs.getInt("managerId"));
                        onBoardee.setManager(new MSManager(rs.getInt("managerId"), rs.getString("managerFName"), rs.getString("managerLName")));
                        onBoardee.setLocation(rs.getString("location"));
                        onBoardee.setEtaCompletion(rs.getString("etaCompletion"));
                        onBoardee.setEmail(rs.getString("email"));
                        onBoardee.setDob(rs.getString("dob"));
                        onBoardee.setOnboardStatus(rs.getString("onboardStatus"));
                        onBoardee.setPhone(rs.getString("phone"));
                    }
                    Integer id = rs.getInt("id");
                    Skill skill = skillKeyskillMap.get(id);
                    if (skill == null) {
                        skill = new Skill();
                        if (onBoardee.getSkills() == null)
                            onBoardee.setSkills(new Skills());
                        if (onBoardee.getSkills().getSkillList() == null)
                            onBoardee.getSkills().setSkillList(new ArrayList<Skill>());

                        onBoardee.getSkills().getSkillList().add(skill);
                        skillKeyskillMap.put(id, skill);
                        skill.setId(rs.getInt("id"));
                        skill.setSkillName(rs.getString("skillName"));
                        skill.setDemandId(rs.getInt("demandId"));
                        skill.setLevel(rs.getString("level"));
                    }
                    onboardeeKeyOnboardeeMap.put(onboardeeKey,onBoardee);
                }
                return list;
            }
        });
    }

    @Override
    public HashMap<String,Object> deleteOnBoardee(int DemandId) {
        HashMap<String, Object> map = new HashMap<>();
        jdbcTemplate.update(DELETE_BY_ID,DemandId);
        map.put("status", 200);
        map.put("message", "Onboardee Deleted");
        return map;
    }

    @Override
    public List<MSManager> fetchManagers() {
        return jdbcTemplate.query(FETCH_MANAGERS,(rs,rown)->{
            return new MSManager(rs.getInt("managerId"),rs.getString("ManagerFname"), rs.getString("managerLname"));
        });
    }

}
