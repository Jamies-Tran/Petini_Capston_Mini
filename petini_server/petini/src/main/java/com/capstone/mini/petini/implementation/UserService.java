package com.capstone.mini.petini.implementation;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.capstone.mini.petini.handlers.exceptions.AccountNotFoundException;
import com.capstone.mini.petini.handlers.exceptions.InvalidUsernameOrPasswordException;
import com.capstone.mini.petini.model.Customer;
import com.capstone.mini.petini.model.PetiniRole;
import com.capstone.mini.petini.model.PetiniUser;
import com.capstone.mini.petini.model.ShopOwner;
import com.capstone.mini.petini.model.status.AccountStatus;
import com.capstone.mini.petini.repositories.PetiniUserRepo;
import com.capstone.mini.petini.service.IRoleService;
import com.capstone.mini.petini.service.IUserService;
import com.capstone.mini.petini.util.DateFormatUtil;

@Service
public class UserService implements IUserService {

    @Autowired
    private PetiniUserRepo petiniUserRepo;

    @Autowired
    private IRoleService roleService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private DateFormatUtil dateFormatUtil;

    @Override
    public PetiniUser findUserByUsername(String username) {
        PetiniUser user = petiniUserRepo.findUserByUsername(username).orElseThrow(() -> new AccountNotFoundException());

        return user;
    }

    @Override
    public PetiniUser registerCustomerAccount(PetiniUser user) {
        Customer customer = new Customer();

        PetiniRole role = roleService.findRoleByName("CUSTOMER");

        customer.setUser(user);
        user.setCustomerProperty(customer);

        role.setUsers(List.of(user));
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(role);
        user.setCreatedDate(dateFormatUtil.formatDateTimeNowToString());
        user.setStatus(AccountStatus.ACTIVE.name());

        PetiniUser savedUser = petiniUserRepo.save(user);

        return savedUser;
    }

    @Override
    public PetiniUser registerOwnerAccount(PetiniUser user) {
        ShopOwner shopOwner = new ShopOwner();
        PetiniRole shopOwnerRole = roleService.findRoleByName("SHOPOWNER");
        shopOwner.setUser(user);
        shopOwnerRole.setUsers(List.of(user));
        user.setShopOwnerProperty(shopOwner);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(shopOwnerRole);
        user.setStatus(AccountStatus.ACTIVE.name());
        PetiniUser savedUser = petiniUserRepo.save(user);

        return savedUser;
    }

    @Override
    public PetiniUser getAuthenticatedUser() {
        UserDetails authenticateUser = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        PetiniUser user = this.findUserByUsername(authenticateUser.getUsername());

        return user;
    }

    @Override
    public PetiniUser login(String username, String password) {
        Optional<PetiniUser> user = petiniUserRepo.findUserByUsername(username);
        if (user.isEmpty() || !passwordEncoder.matches(password, user.get().getPassword())) {
            throw new InvalidUsernameOrPasswordException();
        }

        return user.get();
    }

    @Override
    public List<PetiniUser> getUserListByTypeAndStatus(String type) {
        List<PetiniUser> userList = petiniUserRepo.findAll();
        switch (type.toUpperCase()) {
            case "CUSTOMER":
                userList = userList.stream().filter(u -> u.getCustomerProperty() != null)
                        .collect(Collectors.toList());
                break;
            case "SHOPOWNER":
                userList = userList.stream()
                        .filter(u -> u.getShopOwnerProperty() != null)
                        .collect(Collectors.toList());
                break;
        }
        return userList;

    }

    @Override
    @Transactional
    public PetiniUser updateUser(PetiniUser newUser, String username) {
        PetiniUser user = this.findUserByUsername(username);
        PetiniUser updatedUser = user.newUserBuilder(newUser);
        return updatedUser;
    }

}
