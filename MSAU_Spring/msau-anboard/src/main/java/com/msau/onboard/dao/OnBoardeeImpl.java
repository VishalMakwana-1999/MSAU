package com.msau.onboard.dao;

import com.msau.onboard.entity.MSManager;
import com.msau.onboard.entity.OnBoardee;
import com.msau.onboard.entity.Skill;
import com.msau.onboard.entity.Skills;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;


@Repository
public class OnBoardeeImpl implements OnBoardeeRepository{
    Logger logger= LoggerFactory.getLogger(OnBoardeeImpl.class);

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
            logger.warn("Request for adding onboardee rejected since email already exists");
            return map;
        }
        jdbcTemplate.update("INSERT into onboardee (fname,lname,startDate,bgcStatus,managerId,location,etaCompletion,email,dob,onBoardStatus,phone)" +
               "VALUES (?,?,?,?,?,?,?,?,?,?,?)",onBoardee.getFname(),onBoardee.getLname(),onBoardee.getStartDate(),onBoardee.getBgcStatus(),onBoardee.getManagerId()
        ,onBoardee.getLocation(),onBoardee.getEtaCompletion(),onBoardee.getEmail(),onBoardee.getDob(),onBoardee.getOnboardStatus(),onBoardee.getPhone());
        List<Skill> skillList=onBoardee.getSkills().getSkillList();
        logger.info("Onboardee was added into the database");
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
        logger.info("New Onboardee Added  with id: "+Integer.toString(rown));
        return map;
    }

    @Override
    public HashMap<String,Object> updateOnBoardee(OnBoardee onBoardee) {
        int rown=0;
        HashMap<String,Object> map=new HashMap<>();
        rown=jdbcTemplate.queryForObject("SELECT COUNT(*) as count from onboardee where email='"+onBoardee.getEmail()+"' and demandId!='"
                +onBoardee.getDemandId()+"'", new RowMapper<Integer>() {
            @Override
            public Integer mapRow(ResultSet rs, int i) throws SQLException {
                return rs.getInt("count");
            }
        });
        if (rown>0){
            map.put("Status",204);
            map.put("Message","Another Onboardee has the same email");
            logger.warn("Update Failed since email already present");
            return map;
        }
        jdbcTemplate.update("UPDATE onboardee set fname=?,lname=?,startDate=?,bgcStatus=?,managerId=?,location=?,etaCompletion=?,email=?,dob=?,onBoardStatus=?" +
                ",phone=? where demandId=?",onBoardee.getFname(),onBoardee.getLname(),onBoardee.getStartDate(),onBoardee.getBgcStatus(),onBoardee.getManagerId(),onBoardee.getLocation()
        ,onBoardee.getEtaCompletion(),onBoardee.getEmail(),onBoardee.getDob(),onBoardee.getOnboardStatus(),onBoardee.getPhone(),onBoardee.getDemandId());
        jdbcTemplate.update("DELETE from onboardskill where demandId=?",onBoardee.getDemandId());
        logger.info("Onboardee Details were edited in the database");
        List<Skill> skillList=onBoardee.getSkills().getSkillList();
        for(int i=0;i<skillList.size();i++){
            Skill s= skillList.get(i);
            jdbcTemplate.update("INSERT into onboardskill (demandId,skillName,level) VALUES (?,?,?)",onBoardee.getDemandId(),s.getSkillName(),s.getLevel());
        }

        map.put("Status",200);
        map.put("Message","Onboardee details edited successfully");
        logger.info("Onboardee with id: "+Integer.toString(onBoardee.getDemandId())+" was updated");
        return map;
    }

    @Override
    public OnBoardee getOnBoardeebyId(int DemandId) {
        logger.info("Onboardee with id: "+Integer.toString(DemandId)+" was fetched");
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
        String q=str;
        if(name!="") {
            q = str + "and (o.fname like '%" + name + "%' or o.lname like '%" + name + "%' or o.location like '%"+name+"%')";
            logger.info("Onboardees fetched with name: "+name);
        }
        else{
            logger.info("All Onboardees fetched");
        }

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
        logger.warn("Onboardee with id: "+Integer.toString(DemandId)+" was deleted");
        return map;
    }

    @Override
    public List<MSManager> fetchManagers() {
        logger.info("list of Managers was fetched");
        return jdbcTemplate.query(FETCH_MANAGERS,(rs,rown)->{
            return new MSManager(rs.getInt("managerId"),rs.getString("ManagerFname"), rs.getString("managerLname"));
        });
    }

    @Override
    public HashMap<String, Object> fetchSkills() {
        HashMap<String,Object> map= new HashMap<>();
        ArrayList<String> skills= new ArrayList<>();
        ArrayList<Integer> count=new ArrayList<>();
        jdbcTemplate.query("Select count(*) as count ,skillName from onboardskill group by skillName", new RowMapper<String>() {
            @Override
            public String mapRow(ResultSet resultSet, int i) throws SQLException {
                skills.add(resultSet.getString("skillName"));
                count.add(resultSet.getInt("count"));
                return null;
            }
        });
        map.put("skills",skills);
        map.put("count",count);
        logger.info("Skills Trends Fetched");
        return map;
    }

    @Override
    public HashMap<String, Object> fetchLocationTrends() {
        HashMap<String,Object> map= new HashMap<>();
        ArrayList<String> location= new ArrayList<>();
        ArrayList<Integer> count=new ArrayList<>();
        jdbcTemplate.query("Select count(*) as count ,location from onboardee group by location", new RowMapper<String>() {
            @Override
            public String mapRow(ResultSet resultSet, int i) throws SQLException {
                location.add(resultSet.getString("location"));
                count.add(resultSet.getInt("count"));
                return null;
            }
        });
        map.put("location",location);
        map.put("count",count);
        logger.info("Location Trends Fetched");
        return map;
    }

    @Override
    public HashMap<String, Object> fetchManagerTrends() {
        HashMap<String,Object> map= new HashMap<>();
        ArrayList<String> manager= new ArrayList<>();
        ArrayList<Integer> count=new ArrayList<>();
        jdbcTemplate.query("Select count(*) as count ,m.managerFName, m.managerLName from onboardee as o,msmanager as m where o.managerId=m.managerId group by o.managerId", new RowMapper<String>() {
            @Override
            public String mapRow(ResultSet resultSet, int i) throws SQLException {
                manager.add(resultSet.getString("managerFname")+" "+ resultSet.getString("managerLName"));
                count.add(resultSet.getInt("count"));
                return null;
            }
        });
        map.put("manager",manager);
        map.put("count",count);
        logger.info("Manager Trends Fetched");
        return map;
    }



}
